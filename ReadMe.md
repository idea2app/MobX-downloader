# MobX downloader

File downloading SDK in Web browser, which is powered by [MobX][1].

[![MobX compatibility](https://img.shields.io/badge/Compatible-1?logo=mobx&label=MobX%206%2F7)][1]
[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/MobX-downloader.svg)][2]
[![CI & CD](https://github.com/idea2app/MobX-downloader/actions/workflows/main.yml/badge.svg)][3]

[![NPM](https://nodei.co/npm/mobx-downloader.png?downloads=true&downloadRank=true&stars=true)][4]

## Usage

### Installation

```shell
npm i mobx-downloader
```

#### ESM issue

If you have issues with ESM, you can add the following configuration to your `package.json`:

```json
{
    "resolutions": {
        "native-file-system-adapter": "npm:@tech_query/native-file-system-adapter@^3.0.3"
    }
}
```

then install your project with [Yarn][5] or [PNPM][6].

### `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES6",
        "moduleResolution": "Node",
        "useDefineForClassFields": true,
        "experimentalDecorators": false,
        "jsx": "react-jsx"
    }
}
```

### `model/Downloader.ts`

```javascript
import { Downloader } from 'mobx-downloader';

export const downloader = new Downloader();
```

### `component/Downloader.tsx`

Source code: [https://github.com/idea2app/React-MobX-Bootstrap-ts/blob/master/src/component/Downloader.tsx][7]

```tsx
import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { DownloadTask } from 'mobx-downloader';
import { FC } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';

import { downloader } from '../model/Downloader';

export const DTCard: FC<{ task: DownloadTask }> = observer(({ task }) => (
    <Card>
        <Card.Body>
            <Card.Title>{task.name}</Card.Title>
            <ProgressBar
                striped={task.percent < 100}
                animated={task.executing}
                now={task.percent}
                label={`${task.percent}%`}
            />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
            <small>
                {task.loadedSize.toShortString()} /{' '}
                {task.totalSize.toShortString()}
            </small>
            <div className="d-flex gap-3">
                {task.percent < 100 &&
                    (task.executing ? (
                        <Button
                            size="sm"
                            variant="warning"
                            onClick={() => task.pause()}
                        >
                            <Icon name="pause" />
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            variant="success"
                            onClick={() => task.start()}
                        >
                            <Icon name="play" />
                        </Button>
                    ))}
                <Button
                    size="sm"
                    variant="danger"
                    disabled={task.executing}
                    onClick={() => downloader.destroyTask(task.name)}
                >
                    <Icon name="trash" />
                </Button>
            </div>
        </Card.Footer>
    </Card>
));

export const Downloader: FC = observer(() => (
    <ol className="list-unstyled d-flex flex-column gap-3">
        {downloader.tasks.map(task => (
            <li key={task.id}>
                <DTCard task={task} />
            </li>
        ))}
    </ol>
));
```

### `page/Downloader.tsx`

Source code: [https://github.com/idea2app/React-MobX-Bootstrap-ts/blob/master/src/page/Downloader.tsx][8]

```tsx
import { observer } from 'mobx-react';
import { FC, FormEvent } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import { Downloader } from '../component/Downloader';
import { downloader } from '../model/Downloader';

const addTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const { path } = formToJSON(form);

    await downloader
        .createTask(path as string)
        .start({ chunkSize: 1024 ** 2 / 2 });

    form.reset();
};

export const DownloaderPage: FC = observer(() => (
    <Container>
        <h1 className="my-4">Downloader</h1>

        <Form
            className="d-flex align-items-center gap-3 mb-3"
            onSubmit={addTask}
        >
            <FloatingLabel className="flex-fill" label="URL">
                <Form.Control
                    placeholder="URL"
                    type="url"
                    name="path"
                    required
                />
            </FloatingLabel>

            <Button type="submit">+</Button>
        </Form>

        <Downloader />
    </Container>
));
```

[1]: https://mobx.js.org/
[2]: https://libraries.io/npm/mobx-downloader
[3]: https://github.com/idea2app/MobX-downloader/actions/workflows/main.yml
[4]: https://nodei.co/npm/mobx-downloader/
[5]: https://yarnpkg.com/
[6]: https://pnpm.io/
[7]: https://github.com/idea2app/React-MobX-Bootstrap-ts/blob/master/src/component/Downloader.tsx
[8]: https://github.com/idea2app/React-MobX-Bootstrap-ts/blob/master/src/page/Downloader.tsx
