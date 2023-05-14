package notifications.infrastructure.service

import notifications.domain.service.EmailNotificationService
import agents.domain.entity.Agent
import zio._
import notifications.domain.entity.NotificationData
import courier._, Defaults._
import scala.util._
import utils.Configuration
import javax.mail.internet.InternetAddress

class EmailNotificationServiceImpl extends EmailNotificationService:

  override def sendNotificationToAgent(agent: Agent, content: String): IO[Throwable, NotificationData] =
    ZIO.attempt {
      NotificationData(agent.email)
    }

  override def sendNotificationToAdmins(content: String): IO[Throwable, NotificationData] =
    ZIO.attempt {
      val adminEmail = "noijpiz@gmail.com"
      sendEmail(adminEmail, "Testing", content)
      NotificationData(adminEmail)
    }

  private def sendEmail(email: String, subject: String, content: String): IO[Throwable, NotificationData] =
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
        mailer(Envelope.from("you" `@` "gmail.com")
               .to(InternetAddress(email))
               .subject(subject)
               .content(Text(content))).onComplete {
          case Success(_) => println("Delivered message")
          case Failure(_) => println("Failed to deliver message")
        }
      }
      NotificationData(email)
    }
