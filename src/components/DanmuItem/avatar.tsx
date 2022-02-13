import React, { useEffect, useState } from "react";
import { getUserFace } from "../../apis";
import styles from "./style.module.css";

interface AvatarProps {
  uid: number;
  name: string;
}

const Avatar = (props: AvatarProps) => {
  const { uid, name } = props;
  const [avatar, setAvatar] = useState<string | null>(null);

  const avatarUrl =
    avatar || "https://i0.hdslb.com/bfs/face/member/noface.jpg@24w_24h.webp";

  useEffect(() => {
    // getUserFace(uid).then((avatarUrl) => {
    //   setAvatar(`${avatarUrl}@24w_48h.webp`);
    // });
  }, [uid]);

  return <img className={styles.avatar} src={avatarUrl} alt={name} />;
};

export default Avatar;
