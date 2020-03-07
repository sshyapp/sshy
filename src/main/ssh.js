import { app, clipboard, shell } from 'electron'
import path from 'path'
import fs from 'fs'
import helper from '@grafite/helpers'
import { execSync } from 'child_process'

export default class Ssh {
    static collect = () => {
        let content = (new Ssh).folderHell(path.join(app.getPath('home'), '.ssh'))

        content = content.sort((a, b) => (a.fileName > b.fileName) ? 1 : -1)

        return content
    }

    static copy = publicKey => {
        const content = fs.readFileSync(publicKey, 'utf8').toString()
        clipboard.writeText(content, 'clipboard')
    }

    static reveal = privateKey => shell.showItemInFolder(privateKey)

    static createKey = params => {
        const sshPath = path.join(app.getPath('home'), '.ssh', params.name);

        if (fs.existsSync(sshPath)) {
            return 'File already exists';
        }

        let command = 'ssh-keygen'

        command += ` -b ${params.bits}`

        command += ` -t ${params.type}`

        command += ` -f ${sshPath}`

        if (params.comment) {
            command += ` -C ${params.comment}`
        }

        command += ` -q -N ${params.passphrase || '""'}`

        console.log(command);

        try {
            execSync(command).toString()
            return true
        } catch (e) {
            return e.message
        }
    }

    folderHell = (absolutePath, collected = []) => {
        let tempFiles = []

        const contents = fs.readdirSync(absolutePath)

        contents.forEach(content => {
            let absoluteCurrentContent = path.join(absolutePath, '/', content)

            if (fs.statSync(absoluteCurrentContent).isDirectory()) {
                this.folderHell(absoluteCurrentContent, collected)
            } else {
                tempFiles.push(absoluteCurrentContent)
            }
        })

        tempFiles = this.pairs(tempFiles)
        tempFiles.forEach((file) => collected.push(this.details(file)))

        return collected
    }

    pairs = content => {
        let pairs = []
        content.forEach(fileName => {
            if (content.includes(`${fileName}.pub`)) {
                pairs.push(fileName)
            }
        })

        return pairs
    }

    details = filePath => ({
        privateKey: filePath,
        publicKey: `${filePath}.pub`,
        fileName: helper(filePath).afterLast('/'),
        fullPath: helper(filePath).beforeLast('/'),
        createdAt: fs.statSync(filePath).birthtime
    })
}
