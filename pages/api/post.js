import { ERROR_MSG } from "constants/msg";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const posts = [
  {
    id: '1',
    href: '/post/1',
    title: 'Cập nhật giá iPhone 12 series hiện tại, kèm deal giảm giá khủng ngất ngây',
    content: 'Deal HOT đã về với fan nhà Apple rồi đây. Khuyến mãi tiền triệu siêu hấp dẫn dành riêng cho những bạn yêu thích iPhone 12 series đã đáp cánh tại Thế Giới Di Động. Hãy cùng mình cập nhật giá hiện tại của iPhone 12 và xem khuyến mãi lần này sẽ là gì nha.',
  },
  {
    id: '2',
    href: '/post/2',
    title: 'WWDC 2022: Apple mở tour tham quan đặc biệt tại Apple Park cho khách tham dự',
    content: 'Vào ngày đầu tiên của Hội nghị các nhà phát triển toàn cầu (WWDC), một số nhà phát triển được chọn sẽ đến Apple Park ở Cupertino, California để trải nghiệm một sự kiện đặc biệt tại khuôn viên của Apple.',
  },
  {
    id: '3',
    href: '/post/3',
    title: 'Cận cảnh các phiên bản màu sắc có thể xuất hiện trên iPhone 14 Pro Max',
    content: 'Dạo gần đây, các thông tin rò rỉ về iPhone 14 series được nhiều người quan tâm tìm kiếm, đặc biệt là mẫu iPhone 14 Pro Max, smartphone dự kiến sẽ ra mắt vào tháng 9/2022. Mới đây, đã nhiều tiết lộ về các phiên bản màu sắc có thể xuất hiện trên thiết bị. Mời các bạn cùng tìm hiểu chi tiết nhé!',
  }
];

const hanlderGet = (req, res) => {
  const { url } = req;
  let arr = url?.split("?");
  const id = arr && arr.length > 1 ? arr[1] : null;

  const data = id ? posts.find(item => `${item.id}` === `${id}`) : posts;

  res.status(200).json({ data })
}

const hanlderPost = (req, res) => {
  const { body } = req;
  if (body && body.title && body.content) {
    let newPost = body;
    if (body.id) {
      const index = posts.findIndex(item => `${item.id}` === `${body.id}`);

      if (index !== -1) {
        posts[index] = body;
      } else {
        res.status(500).json({ error: ERROR_MSG.DATA_NOT_FOUND })
        return;
      }

    } else {
      newPost = {
        ...body,
        id: Number(new Date())
      }
      posts.unshift(newPost)
    }

    res.status(200).json({ data: newPost })
    return;
  }
  res.status(500).json({ error: 'Invalid data' })
}

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      hanlderGet(req, res)
      break;
    case 'POST':
      hanlderPost(req, res)
      break;
  }
}