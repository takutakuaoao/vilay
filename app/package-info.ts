import { productName } from './package.json'

export function getProductName() {
  return process.env.NODE_ENV === 'development'
    ? `${productName}-dev`
    : productName
}
