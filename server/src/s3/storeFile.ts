import AWS from 'aws-sdk'
import { v4 as uuid4 } from 'uuid'
import { ArtType } from '../graphql/schema.types'
const s3 = new AWS.S3()
const s3Bucket = 'wanderlust-test-bucket'
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('environment variables AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY are not set.')
}

export async function storeFile(b64: string, contentType: ArtType): Promise<string> {
  const filename = uuid4()
  const body = Buffer.from(b64, 'base64')
  await s3
    .upload({
      Body: body,
      Bucket: s3Bucket,
      Key: filename,
      ACL: 'public-read',
      ContentType: getMimeType(contentType),
    })
    .promise()
  return `https://${s3Bucket}.s3-us-west-2.amazonaws.com/${filename}`
}

function getMimeType(artType: ArtType): string {
  switch (artType) {
    case ArtType.Text:
      return 'text/plain'
    case ArtType.Image:
      return 'image/jpeg'
    case ArtType.Audio:
      return 'TODO'
    case ArtType.Video:
      return 'TODO'
  }
}
