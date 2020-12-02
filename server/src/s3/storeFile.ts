import AWS from 'aws-sdk'
import { v4 as uuid4 } from 'uuid'
import { ArtType } from '../../../web/src/graphql/query.gen'
import beeline from '../beeline'
const s3Bucket = process.env.NODE_ENV == 'production' ? 'wanderlust-images' : 'wanderlust-images-dev'
const s3Region = 'us-west-2'

const s3 = new AWS.S3()
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('environment variables AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY are not set.')
}

export async function storeFile(b64: string): Promise<[string, ArtType]> {
  const span = beeline.startSpan({
    name: 's3',
  })
  const filename = uuid4()
  const type = b64.match(/^data:[a-z\/]+;base64, /)
  if (!type || type.length !== 1) {
    throw new Error('No type information provided for upload')
  }
  const mimeType = type[0].substring(type[0].indexOf(':') + 1, type[0].indexOf(';'))
  if (!isSupportedMimeType(mimeType)) {
    throw new Error(`Unsupported type ${mimeType}`)
  }

  const body = Buffer.from(b64.substring(type[0].length), 'base64')
  await s3
    .upload({
      Body: body,
      Bucket: s3Bucket,
      Key: filename,
      ACL: 'public-read',
      ContentType: mimeType,
    })
    .promise()
  beeline.finishSpan(span)
  return [`https://${s3Bucket}.s3-${s3Region}.amazonaws.com/${filename}`, mimeTypeToArtType[mimeType]]
}

type acceptedMimeTypes = 'text/plain' | 'image/jpeg' | 'image/png'
const mimeTypeToArtType = { 'text/plain': ArtType.Text, 'image/jpeg': ArtType.Image, 'image/png': ArtType.Image }
function isSupportedMimeType(mime: string): mime is acceptedMimeTypes {
  return ['text/plain', 'image/jpeg', 'image/png'].includes(mime)
}
