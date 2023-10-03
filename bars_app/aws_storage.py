from storages.backends.s3boto3 import S3Boto3Storage
from bars.settings import S3_BUCKET_NAME



class MediaStorage(S3Boto3Storage):
    bucket_name = S3_BUCKET_NAME
    region_name = 'eu-central-1'