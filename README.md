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

Workflow currently supports width or percentage syntax.

- It will always keep aspect ratio.
- Parameters separated with space.
- By default "px" assumed.

```bash
sq [width_value[px]]|[percent_value%] ...
```

For example:

```bash
#three files will be saved
sq 256 128px 5%
```

Processed files saved to the same location as original, with names :

```
[filename]-parameter.[fileExtension]
```

Be careful the is not safeguard on how big image you will produce!

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
