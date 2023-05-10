package notifications.domain.service

import agents.domain.entity.Agent
import notifications.domain.entity.NotificationData
import zio._

trait EmailNotificationService:
    def sendNotificationToAgent(agent: Agent): IO[Throwable, NotificationData] = ???
