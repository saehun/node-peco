## Node Peco
[peco](https://github.com/peco/peco) nodejs binding library

> NOTE: external command `peco` is required. see [peco installation](https://github.com/peco/peco#installation)

![NPM](https://img.shields.io/npm/l/node-peco)
![github ci](https://github.com/minidonut/node-peco/workflows/CI/badge.svg)
[![npm](https://img.shields.io/npm/v/node-peco)](https://www.npmjs.com/package/node-peco)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/node-peco?label=size)

<img alt="example" src="https://user-images.githubusercontent.com/16033316/113511665-eb97dd80-959b-11eb-8929-38088da5af17.gif" width="640" />

## Installation
```
yarn add node-peco
```

## Usage
This package exports only one function named `peco`.
```ts
import { peco } from 'node-peco'; // or require('node-peco');

peco(['foo', 'bar', 'baz']).then(selected => console.log(selected));
```

You can pass option as a second argument
```ts
import { peco, PecoOption } from 'node-peco';

const pecoOption: PecoOption = {
  onCancel: 'reject',
  layout: 'bottom-up',
  selectionPrefix: '*',
  prompt: "Choose ->",
};

peco(['foo', 'bar', 'baz'], pecoOption).then(selected => console.log(selected));
```

for more examples, see [examples](https://github.com/minidonut/node-peco/tree/master/examples)

## Option

There are two categories of option. One is **js** dependent:

key | type | description | default
--- | ---- | ----------- | -------
`bin` | string | peco binary command(or location path) | `"peco"`
`onCancel` | `"reject" \| "skip"` | specify behavior when received `SIGINT` | `"skip"`
`onError` | `"reject" \| "exit"` | specify behavior when `peco` exited with non-zero code | `"exit"`

The other is `peco` command line option. See [peco#command-line-options](https://github.com/peco/peco#command-line-options)
