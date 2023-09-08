from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    bucket_name = 'bars-bucket01'
    location = 'test'
    region_name = 'eu-central-1'