const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const fetch = require('node-fetch');
const formatMessage = require('format-message');
const api = 'https://api.ctb.hu';
class Scratch3MC {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'Craftabor',
            name: 'Craftabor',
            blocks: [
                {
                    opcode: 'placeBlock',
                    blockType: BlockType.COMMAND,
                    text: 'Rakj le egy [BLOCK] blokkot a X: [X] Y: [Y] Z: [Z] koordinátára. Scratch token: [token]',
                    arguments: {
                        BLOCK: {
                            type: ArgumentType.STRING,
                            menu: 'blocks'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        token: {
                            type: ArgumentType.STRING,
                            defaultValue: 'abcdefg'
                        }
                    }
                },
                {
                    opcode: 'fillArea',
                    blockType: BlockType.COMMAND,
                    text: `Tölts ki egy területet a 
                    [BLOCK] blokkal az X: [X] Y: [Y] Z: [Z]-tól X: [X2] Y: [Y2] Z: [Z2]-ig. Scratch token: [token]`,
                    arguments: {
                        BLOCK: {
                            type: ArgumentType.STRING,
                            menu: 'blocks'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Z2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        token: {
                            type: ArgumentType.STRING,
                            defaultValue: 'abcdefg'
                        }
                    }
                }
            ],
            menus: {
                blocks: [
                    {
                        text: formatMessage('Föld'),
                        value: 'dirt'
                    },
                    {
                        text: formatMessage('Kő'),
                        value: 'stone'
                    },
                    {
                        text: formatMessage('Fehér beton'),
                        value: 'white_concrete'
                    },
                    {
                        text: formatMessage('Narancs beton'),
                        value: 'orange_concrete'
                    },
                    {
                        text: formatMessage('Bíbor beton'),
                        value: 'magenta_concrete'
                    },
                    {
                        text: formatMessage('Világoszöld beton'),
                        value: 'lime_concrete'
                    },
                    {
                        text: formatMessage('Sárga beton'),
                        value: 'yellow_concrete'
                    },
                    {
                        text: formatMessage('Rózsaszín beton'),
                        value: 'pink_concrete'
                    },
                    {
                        text: formatMessage('Szürke beton'),
                        value: 'gray_concrete'
                    },
                    {
                        text: formatMessage('Világosszürke beton'),
                        value: 'light_gray_concrete'
                    },
                    {
                        text: formatMessage('Türkizkék beton'),
                        value: 'cyan_concrete'
                    },
                    {
                        text: formatMessage('Lila beton'),
                        value: 'purple_concrete'
                    },
                    {
                        text: formatMessage('Kék beton'),
                        value: 'blue_concrete'
                    },
                    {
                        text: formatMessage('Barna beton'),
                        value: 'brown_concrete'
                    },
                    {
                        text: formatMessage('Zöld beton'),
                        value: 'green_concrete'
                    },
                    {
                        text: formatMessage('Piros beton'),
                        value: 'red_concrete'
                    },
                    {
                        text: formatMessage('Fekete beton'),
                        value: 'black_concrete'
                    }
                ]
            }
        };
    }

    async placeBlock (args) {
        const block = Cast.toString(args.BLOCK);
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const z = Cast.toNumber(args.Z);
        const token = Cast.toString(args.token);

        const req = await fetch(
            `${api}/participant/block/${block}?x=${x}&y=${y}&z=${z}`,
            {
                method: 'POST',
                headers: {
                    Authorization: token
                }
            }
        );
        if (req.status === 429) {
            return log.log(
                'Túl sok kérés-t küldtél egyszerre, kérlek rakj szünetet a blokkok közé!'
            );
        }
        log.log(req.status);
    }

    async fillArea (args) {
        const block = Cast.toString(args.BLOCK);
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const z = Cast.toNumber(args.Z);
        const x2 = Cast.toNumber(args.X2);
        const y2 = Cast.toNumber(args.Y2);
        const z2 = Cast.toNumber(args.Z2);
        const token = Cast.toString(args.token);

        const req = await fetch(
            `${api}/participant/fill/${block}?x1=${x}&y1=${y}&z1=${z}&x2=${x2}&y2=${y2}&z2=${z2}`,
            {
                method: 'POST',
                headers: {
                    Authorization: token
                }
            }
        );
        if (req.status === 429) {
            return log.log(
                'Túl sok kérés-t küldtél egyszerre, kérlek rakj szünetet a blokkok közé!'
            );
        }
        log.log(req.status);
    }
}

module.exports = Scratch3MC;
