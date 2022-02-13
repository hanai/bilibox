import axios from "axios";

class ApiError extends Error {
  err?: any;

  constructor(msg: string, err: any) {
    super(msg);
    this.err = err;
  }
}

export const getUserFace = (uid: number): Promise<string> => {
  return axios
    .get(`https://api.obfs.dev/api/bilibili/v3/user_info?uid=${uid}`)
    .then((res) => res.data)
    .then((data) => {
      if (data.code === 0) {
        return data.data.card.face;
      } else {
        throw new ApiError("Read user avatar failed", data);
      }
    });
};

export const getUserAvatar = (uid: number) => {
  return getUserInfo(uid)
    .then((res) => res.data)
    .then((data) => {
      if (data.code === 0) {
        return data.data.face;
      } else {
        throw new ApiError("Read user avatar failed", data);
      }
    });
};

export const getUserInfo = (uid: number) => {
  return axios.get<{
    code: number;
    message: string;
    ttl: number;
    data: {
      mid: number;
      name: string;
      sex: string;
      face: string;
      face_nft: number;
      sign: string;
      rank: number;
      level: number;
      jointime: number;
      moral: number;
      silence: number;
      coins: number;
      fans_badge: false;
      fans_medal: {
        show: false;
        wear: false;
        medal: null;
      };
      official: {
        role: number;
        title: string;
        desc: string;
        type: number;
      };
      vip: {
        type: number;
        status: number;
        due_date: number;
        vip_pay_type: number;
        theme_type: number;
        label: {
          path: string;
          text: string;
          label_theme: string;
          text_color: string;
          bg_style: number;
          bg_color: string;
          border_color: string;
        };
        avatar_subscript: number;
        nickname_color: string;
        role: number;
        avatar_subscript_url: string;
      };
      pendant: {
        pid: number;
        name: string;
        image: string;
        expire: number;
        image_enhance: string;
        image_enhance_frame: string;
      };
      nameplate: {
        nid: number;
        name: string;
        image: string;
        image_small: string;
        level: string;
        condition: string;
      };
      user_honour_info: {
        mid: number;
        colour: null;
        tags: [];
      };
      is_followed: boolean;
      top_photo: string;
      theme: {};
      sys_notice: {};
      live_room: {
        roomStatus: number;
        liveStatus: number;
        url: string;
        title: string;
        cover: string;
        online: number;
        roomid: number;
        roundStatus: number;
        broadcast_type: number;
      };
      birthday: string;
      school: {
        name: string;
      };
      profession: {
        name: string;
      };
      tags: null;
      series: {
        user_upgrade_status: number;
        show_upgrade_window: boolean;
      };
      is_senior_member: number;
    };
  }>(`https://api.bilibili.com/x/space/acc/info?mid=${uid}`);
};

export const getRoomid = async (short: number) => {
  const {
    data: {
      data: { room_id },
    },
  } = await axios.get(
    `https://api.live.bilibili.com/room/v1/Room/mobileRoomInit?id=${short}`
  );
  return room_id as number;
};
