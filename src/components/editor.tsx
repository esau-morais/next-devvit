"use client";

import { useHydration } from "@/lib/hooks/use-hydration";
import { uploadFiles } from "@/lib/uploadthing";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef } from "react";

export function Editor() {
  const hasMounted = useHydration();
  const editorRef = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          // header: Header,
          // linkTool: {
          //   class: LinkTool,
          //   config: {
          //     endpoint: "/api/link",
          //   },
          // },
          // image: {
          //   class: ImageTool,
          //   config: {
          //     uploader: {
          //       async uploadByFile(file: File) {
          //         const [res] = await uploadFiles([file], "imageUploader");
          //
          //         return {
          //           success: 1,
          //           file: {
          //             url: res.url,
          //           },
          //         };
          //       },
          //     },
          //   },
          // },
          // list: List,
          // code: Code,
          // inlineCode: InlineCode,
          // table: Table,
          // embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (hasMounted) {
      init();

      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [hasMounted, initializeEditor]);

  return (
    <div className="w-full p-4 bg-secondary rounded-lg border border-border">
      <form id="subreddit-post-form" className="w-fit">
        <div className="prose prose-stone dark:prose-invert">
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
}
