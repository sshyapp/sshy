import fs from 'fs';
import {app, clipboard} from 'electron';
import path from 'path';

const helper = require('@grafite/helpers');

export default class SshKey {
    public static collect(): Array<any> {
        let content = (new SshKey).folderHell(
            path.join(app.getPath('home'), '.ssh')
        );

        content = content.sort((a: any, b: any) => (a.fileName > b.fileName) ? 1 : -1);

        return content;
    }

    public static copyContent(publicKey: string) {
        const content = fs.readFileSync(publicKey, 'utf8').toString();
        clipboard.writeText(content, 'clipboard')
    }

    private folderHell(absolutePath: string, collected: Array<any> = []): Array<any> {
        let tempFiles: Array<any> = [];

        const contents = fs.readdirSync(absolutePath);

        contents.forEach((content: any) => {
            let absoluteCurrentContent = path.join(absolutePath, '/', content);

            if (fs.statSync(absoluteCurrentContent).isDirectory()) {
                this.folderHell(absoluteCurrentContent, collected);
            } else {
                tempFiles.push(absoluteCurrentContent);
            }
        });

        tempFiles = this.pairs(tempFiles);
        tempFiles.forEach((file: any) => collected.push(this.details(file)));

        return collected;
    }

    private pairs(content: Array<string>) {
        let pairs: Array<string> = [];
        content.forEach((fileName: string) => {
            if (content.includes(`${fileName}.pub`)) {
                pairs.push(fileName);
            }
        });

        return pairs;
    }

    private details(filePath: string) {
        return {
            privateKey: filePath,
            publicKey: `${filePath}.pub`,
            fileName: helper(filePath).afterLast('/'),
            createdAt: fs.statSync(filePath).birthtime
        }
    }
}
