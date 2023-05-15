package notifications.infrastructure.service

import notifications.domain.service.EmailNotificationService
import agents.domain.entity.Agent
import zio._
import notifications.domain.entity.NotificationData
import courier._, Defaults._
import scala.util._
import utils.Configuration
import javax.mail.internet.InternetAddress
import java.util.concurrent.CompletableFuture

class EmailNotificationServiceImpl extends EmailNotificationService:

  override def sendNotificationToAgent(agent: Agent, content: String): IO[Throwable, NotificationData] =
    ZIO.attempt {
      NotificationData(agent.email)
    }

  override def sendNotificationToAdmins(content: String): IO[Throwable, NotificationData] =
    for
      adminEmails <- ZIO.fromOption(
        Configuration.get("admin.mails")
      ).mapError(e => Throwable("Can't get config"))
      sended <- sendEmail(
        emails = adminEmails.split(",").toList,
        subject = "Combifer Notification System",
        content = content
      )
      _ <- ZIO.logInfo(s"Sended Email to $adminEmails")
    yield(
      sended
    )

  private def sendEmail(emails: List[String], subject: String, content: String): IO[Throwable, NotificationData] =
    ZIO.attempt {
      (for
          mailserver <- Configuration.get("mailserver.smtp")
          portText <- Configuration.get("mailserver.port")
          port <- portText.toIntOption
          systemEmail <- Configuration.get("mailserver.address")
          systemPassword <- Configuration.get("mailserver.password")
        yield(
          Mailer(mailserver, port)
          .auth(true)
          .as(systemEmail, systemPassword)
          .startTls(true)()
        )
      ).toRight(Throwable("Can't generate mailer"))
      .map { mailer =>
        val envelope = Envelope.from("noreply.nojipiz" `@` "gmail.com")
          .to(emails.map(InternetAddress(_)): _*)
          .subject(subject)
          .content(Text(content))
        val mailerFuture = CompletableFuture.supplyAsync(() => mailer(envelope))
        for
          sender <- ZIO.fromCompletableFuture(mailerFuture).unit
          _ <- ZIO.logInfo(s"Sending email...")
        yield()
      }
      NotificationData(emails.mkString(","))
    }
