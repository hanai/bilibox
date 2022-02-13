import React from "react";
import classNames from "classnames";
import Avatar from "./avatar";
import styles from "./style.module.css";

interface DanmuItemProps {
  uid: number;
  username: string;
  ct: string;
  ts: number;
  unc?: string;
  msg: string;
}

const DanmuItem = (props: DanmuItemProps) => {
  const { username, unc, msg, uid, ts, ct } = props;
  return (
    <div
      data-ts={ts}
      data-ct={ct}
      className={classNames(styles.container, "danmu-item")}
    >
      <Avatar uid={uid} name={username} />
      <div className={styles.msg}>
        <span className={styles.username} style={{ color: unc }}>
          {username}
        </span>
        <span className={styles.msgText}>: {msg}</span>
      </div>
    </div>
  );
};

export default DanmuItem;
