package notifications.infrastructure.service

import notifications.domain.service.EmailNotificationService
import agents.domain.entity.Agent
import zio._
import notifications.domain.entity.NotificationData
import courier._, Defaults._
import scala.util._

class EmailNotificationServiceImpl extends EmailNotificationService:
  override def sendNotificationToAgent(agent: Agent): IO[Throwable, NotificationData] =
    ZIO.attempt {
      val mailer = Mailer("smtp.gmail.com", 587)
        .auth(true)
        .as("you@gmail.com", "p@$$w3rd")
        .startTls(true)()
      mailer(Envelope.from("you" `@` "gmail.com")
               .to("mom" `@` "gmail.com")
               .cc("dad" `@` "gmail.com")
               .subject("miss you")
               .content(Text("hi mom"))).onComplete {
        case Success(_) => println("message delivered")
        case Failure(_) => println("delivery failed")
      }
      NotificationData(agent.email)
    }
