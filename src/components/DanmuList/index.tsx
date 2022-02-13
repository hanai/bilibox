import React, { useCallback, useEffect, useRef, useState } from "react";
import { LiveWS } from "bilibili-live-ws";
import DanmuItem from "../DanmuItem";
import { getRoomid } from "../../apis";

import styles from "./style.module.css";

const DanmuList = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [danmuList, setDanmuList] = useState<
    {
      username: string;
      msg: string;
      uid: number;
      face?: string;
      unc?: string;
      ts: number;
      ct: string;
    }[]
  >([]);

  const clearInvisibleDanmu = useCallback(() => {
    const items = listRef.current?.getElementsByClassName("danmu-item") || [];
    const len = items.length;
    const mid = Math.floor(len / 2);
    if (len) {
      const el = items[mid];
      const { y, height } = el.getBoundingClientRect();
      if (y < 0 && Math.abs(y) > height) {
        const ct = el.getAttribute("data-ct");
        const ts = parseInt(el.getAttribute("data-ts") || "0");
        setDanmuList((list) =>
          list.slice(list.findIndex((e) => e.ct === ct && e.ts === ts))
        );
      }
    }
  }, []);

  useEffect(() => {
    (async function () {
      let roomId = 55;

      if (roomId.toString().length < 3) {
        roomId = await getRoomid(roomId);
      }

      const live = new LiveWS(roomId, {
        // address: "wss://tx-gz-live-comet-02.chat.bilibili.com/sub",
      });

      live.on("open", () => console.log("open"));
      live.on("live", () => {
        console.log("live");
      });

      live.on("heartbeat", () => {
        console.log("heartbeat");
      });

      live.on("close", () => {
        console.log("close");
      });

      live.on("DANMU_MSG", ({ info }) => {
        const msg = info[1];
        const [uid, username, _2, _3, _4, _5, _6, usernameColor] = info[2];
        const { ts, ct } = info[9] as { ts: number; ct: string };
        setDanmuList((list) => [
          ...list,
          {
            ts: ts,
            ct: ct,
            uid,
            username: username,
            msg: msg,
            unc: usernameColor,
          },
        ]);
      });

      // live.on("msg", console.log);
    })();

    setInterval(clearInvisibleDanmu, 10000);
  }, [clearInvisibleDanmu]);

  return (
    <div className={styles.listContainer} ref={listRef}>
      {danmuList.map((e) => (
        <DanmuItem key={`${e.ts}${e.ct}`} {...e} />
      ))}
    </div>
  );
};

export default DanmuList;
