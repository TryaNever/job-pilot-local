from redis.asyncio import Redis

redis_client = Redis(
    "redis://redis:6379",
    decode_responses=True
)


def get_redis_client():
    return redis_client