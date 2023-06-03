# Alfred Squoosh Resizer

This is a wrapper for [@squoosh/lib](https://www.npmjs.com/package/@squoosh/lib#extracting-image-information) made, using [alfy](https://github.com/sindresorhus/alfy) package.

## Installation

Use npm to install the workflow.

```bash
npm i --global alfred-squoosh-resizer
```

## Usage

Select file[s] in finder and then run keyword "sq"
video here!!!!

## Parameters

Workflow currently supports width or percentage syntax. It will always keep aspect ratio.

```
sq [width_value[px]]|[percent_value%] ...
#for example
sq 256 128px 5%
```

Processed files saved to the same location as original, with names :

```
[filename]-parameter.[fileExtension]
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
