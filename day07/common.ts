import { isDefinedAndNotEmpty, isNotEmpty } from "../lib/fp.ts";
import { sumAll } from "../lib/math.ts";

export interface ParsedInput {
  lines: (Path | Command)[];
  fs: Path;
}

export type FilePath = {
  type: "file";
  name: string;
  parent: DirPath;
  size: number;
};
export type DirPath = {
  type: "dir";
  name: string;
  parent: DirPath | null;
  children: Path[];
};
export type Path = FilePath | DirPath;

export type CdCommand = { type: "cd"; arg: string };
export type LsCommand = { type: "ls" };
export type Command = CdCommand | LsCommand;

export function parse(input: string): ParsedInput {
  const partialLines = parseLines(input);
  const [fs, lines] = reconstitureFsTree(partialLines);

  const parsed: ParsedInput = { lines, fs };
  return parsed;
}

function parseLines(fileInput: string): (Partial<Path> | Command)[] {
  return fileInput
    .split("\n")
    .filter(isDefinedAndNotEmpty)
    .map((line) => {
      if (line.startsWith("$")) {
        const [, cmd, arg] = line.split(" ");
        if (cmd === "ls") {
          return { type: "ls" };
        } else {
          return { type: "cd", arg };
        }
      } else {
        const [size, name] = line.split(" ");
        if (size === "dir") {
          return { type: "dir", name, children: [] };
        } else {
          return { type: "file", name, size: parseInt(size, 10) };
        }
      }
    });
}

function reconstitureFsTree(
  lines: (Partial<Path> | Command)[]
): [Path, (Path | Command)[]] {
  const pending = [...lines];
  const fs: Path = { type: "dir", name: "/", parent: null, children: [] };
  let currentDir: DirPath = fs as DirPath;

  while (isNotEmpty(pending)) {
    const currentCommand = pending.shift()!;

    switch (currentCommand.type) {
      case "ls": {
        const content: Partial<Path>[] = [];
        while (
          isNotEmpty(pending) &&
          (pending[0].type === "dir" || pending[0].type === "file")
        ) {
          content.push(pending.shift()! as Partial<Path>);
        }
        content.forEach((path) => {
          path.parent = currentDir;
          currentDir.children.push(path as Path);
        });
        break;
      }
      case "cd":
        if (currentCommand.arg === "/") {
          break;
        } else if (currentCommand.arg === "..") {
          currentDir = currentDir.parent!;
        } else {
          currentDir = currentDir.children.find(
            (path) => path.name === currentCommand.arg
          )! as DirPath;
        }
        break;
    }
  }

  return [fs, lines as (Path | Command)[]];
}

export function findDirectories(
  fs: Path,
  filter: (path: DirPath) => boolean
): DirPath[] {
  const pending = [fs];
  const result: DirPath[] = [];
  while (isNotEmpty(pending)) {
    const current = pending.shift()!;
    if (current.type === "dir") {
      pending.push(...current.children);
      if (filter(current)) {
        result.push(current);
      }
    }
  }
  return result;
}

export function getSize(path: Path): number {
  if (path.type === "file") {
    return path.size;
  } else {
    return path.children.map((p) => getSize(p)).reduce(sumAll);
  }
}
