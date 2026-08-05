from taskiq_redis import ListQueueBroker

broker = ListQueueBroker(
    "redis://redis:6379",
    socket_timeout=None,
    )

import workers.post_offer