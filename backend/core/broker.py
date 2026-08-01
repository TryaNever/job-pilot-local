from taskiq_redis import ListQueueBroker

broker = ListQueueBroker("redis://redis:6379")

import tasks.post_offer