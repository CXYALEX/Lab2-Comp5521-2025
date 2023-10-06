const fs = require('fs')

if (process.argv.length < 4) {
  console.error('Please provide the project ID and private key as arguments')
  process.exit(1)
}

const api_key = process.argv[2].trim()
const pri_key = process.argv[3].trim()

fs.writeFile("src/env/.secret", `PROJECT_ID=${api_key}\nPRIVATE_KEY=${pri_key}`, (err) => {
  if (err) {
    console.log(err)
    return
  } else {
    console.log("Secret file created.")
    console.log(`Project ID: ${api_key}`)
    console.log(`Private Key: ${pri_key}\n`)
  }
})