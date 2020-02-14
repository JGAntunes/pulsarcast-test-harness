# Pulsarcast Test Harness

A test harness for [Pulsarcast](https://github.com/JGAntunes/pulsarcast) to be used with [IPFS Testbed](https://github.com/JGAntunes/ipfs-testbed) and [IPFS Testbed Cli](https://github.com/JGAntunes/ipfs-testbed-cli)

This repository consists of a CLI tool that processes datasets and generates valid output to be used in the IPFS Testbed.

## Requirements

- `nodejs` `>=8` in order to use the cli
- A dataset supported by our tool, currently we support:
  - [Reddit comments dataset](https://www.reddit.com/r/datasets/comments/3bxlg7/i_have_every_publicly_available_reddit_comment/)

## Install

```
npm install
```

Or skip the install step entirely and just use npx

```
npx -p pulsarcast-test-harness pulsar-test <command>
```

## CLI Usage

```
$> pulsar-test run reddit-comments --help
bin.js run reddit-comments <path>

run the reddit comments dataset

Positionals:
  path  path to the dataset file                             [string] [required]

Options:
  --version         Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  --resize          resize the number of users to a specific value      [number]
  --remove-deleted  remove the deleted users (without id)
                                                       [boolean] [default: true]
```

Using together with `ipt`:
```
pulsar-test run reddit-comments <path-to-dataset> --resize 100 > ipt exec pulsarcast load
```

## Results

The test runs executed for the purpose of my [M.Sc. Thesis](https://github.com/JGAntunes/pulsarcast) are stored in [results](./results). The data extracted from the IPFS Testbed has been processed into a set of spreadsheets which are available [here](https://docs.google.com/spreadsheets/d/1Fv0KtURIAPX0SOjlF1yqEz6B7Pyh_myhARlVV5rRi9s/edit?usp=sharing).

## Acknowledgements

A very special thank you to Microsoft Azure (and specially [@palma21](https://github.com/palma21)) for supporting our executions.

## License
MIT
