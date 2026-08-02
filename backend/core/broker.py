from taskiq_redis import ListQueueBroker

broker = ListQueueBroker(
    "redis://redis:6379",
    socket_timeout=None,
    )

import tasks.post_offer