export type CategoryId =
  | 'tin-benhub'
  | 'nganh-logistics'
  | 'cong-nghe'
  | 'chinh-sach'
  | 'case-study'

export interface Category {
  id: CategoryId
  label: string
  color: string
  gradient: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'tin-benhub',
    label: 'Tin BenHub',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 50%, #fb923c 100%)',
  },
  {
    id: 'nganh-logistics',
    label: 'Ngành Logistics',
    color: '#1E3A5F',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%)',
  },
  {
    id: 'cong-nghe',
    label: 'Công Nghệ',
    color: '#0F6E56',
    gradient: 'linear-gradient(135deg, #052e16 0%, #0f6e56 50%, #14b8a6 100%)',
  },
  {
    id: 'chinh-sach',
    label: 'Chính Sách',
    color: '#475569',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)',
  },
  {
    id: 'case-study',
    label: 'Case Study',
    color: '#B45309',
    gradient: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)',
  },
]

export type NewsIconName =
  | 'market'
  | 'ticket'
  | 'route'
  | 'fleet'
  | 'trust'
  | 'broadcast'

export interface Author {
  name: string
  title: string
  initials: string
  bio: string
}

export interface NewsPost {
  slug: string
  icon: NewsIconName
  categoryId: CategoryId
  tags: string[]
  title: string
  excerpt: string
  sapo: string
  date: string
  readTime: string
  isFeatured: boolean
  author: Author
  heroIndex: string
  takeaways: string[]
  sections: Array<{
    heading: string
    paragraphs: string[]
  }>
}

export const newsPosts: NewsPost[] = [
  {
    slug: 'operating-system-van-tai-cong-trinh',
    icon: 'market',
    categoryId: 'nganh-logistics',
    tags: ['logistics', 'operating-system', 'digital', 'construction'],
    isFeatured: true,
    title: 'Vì sao vận tải công trình cần một operating system riêng?',
    excerpt:
      'Ngành xây dựng có quy mô lớn nhưng dữ liệu vận tải vẫn phân tán giữa điện thoại, phiếu giấy và bảng tính.',
    sapo:
      'Một công trường có thể có hàng trăm chuyến xe mỗi ngày, nhiều điểm nhận - trả, nhiều đội xe và nhiều lớp đối soát. Khi mọi thứ vẫn chạy bằng cuộc gọi và phiếu giấy, dữ liệu vận hành bị mất ngay tại thời điểm nó được tạo ra.',
    date: '14.05.2026',
    readTime: '6 phút đọc',
    author: {
      name: 'BenHub Strategy Team',
      title: 'Strategy & Research tại BenHub',
      initials: 'BS',
      bio: 'Đội ngũ chiến lược BenHub chuyên nghiên cứu thị trường logistics xây dựng và định hướng phát triển sản phẩm.',
    },
    heroIndex: '01',
    takeaways: [
      'Vận tải công trình là một bài toán vận hành realtime, không chỉ là bài toán gọi xe.',
      'E-Ticket, GPS và đối soát tự động phải nằm trong cùng một luồng dữ liệu.',
      'Operating system giúp các bên nhìn cùng một sự thật vận hành.',
    ],
    sections: [
      {
        heading: 'Vấn đề không nằm ở số lượng xe',
        paragraphs: [
          'Việt Nam không thiếu xe ben, đội xe địa phương hay nhà thầu vận tải. Thứ thiếu là một lớp điều phối chung để biết xe nào đang rảnh, tuyến nào đang nghẽn, chuyến nào đã hoàn tất và khối lượng nào đã được xác thực.',
          'Khi dữ liệu nằm rải rác trong điện thoại, phiếu giấy và file Excel, chủ đầu tư khó kiểm soát tiến độ, đội xe khó tối ưu doanh thu, còn tài xế dễ bị kẹt trong vòng đối soát kéo dài.',
        ],
      },
      {
        heading: 'Operating system cho một chuỗi vận hành nhiều bên',
        paragraphs: [
          'Một operating system cho vận tải công trình cần kết nối lệnh vận chuyển, phân bổ xe, GPS tracking, E-Ticket, nghiệm thu khối lượng và thanh toán. Các bước này phải nói chuyện với nhau bằng dữ liệu nhất quán.',
          'BenHub tập trung vào lớp vận hành cốt lõi đó: biến mỗi chuyến xe thành một bản ghi có thời gian, tọa độ, trạng thái và bằng chứng đối soát.',
        ],
      },
      {
        heading: 'Khi dữ liệu trở thành hạ tầng',
        paragraphs: [
          'Khi dữ liệu chuyến xe đủ tin cậy, các lớp tiếp theo mới có thể mở ra: ứng tiền nhanh cho đội xe, marketplace vật liệu, phân tích năng suất, ESG carbon reporting và AI dispatch.',
          'Đây là lý do BenHub không chỉ xây một ứng dụng quản lý, mà xây lớp hạ tầng số cho logistics xây dựng.',
        ],
      },
    ],
  },
  {
    slug: 'khoang-trong-so-hoa-logistics-xay-dung',
    icon: 'market',
    categoryId: 'nganh-logistics',
    tags: ['market', 'infrastructure', 'digitalization', 'vietnam'],
    isFeatured: false,
    title: '60-80 tỷ USD và khoảng trống số hóa của logistics xây dựng',
    excerpt:
      'Những tín hiệu từ hạ tầng, khu công nghiệp và đô thị hóa đang tạo nhu cầu vận tải khổng lồ cho giai đoạn mới.',
    sapo:
      'Hạ tầng giao thông, khu công nghiệp và đô thị hóa đang kéo nhu cầu vận tải vật liệu tăng nhanh. Nhưng phần mềm vận hành chuyên sâu cho công trường vẫn còn rất ít.',
    date: '12.05.2026',
    readTime: '5 phút đọc',
    author: {
      name: 'BenHub Research',
      title: 'Research & Analysis tại BenHub',
      initials: 'BR',
      bio: 'Nhóm nghiên cứu BenHub theo dõi và phân tích xu hướng thị trường logistics, hạ tầng và đầu tư công tại Việt Nam.',
    },
    heroIndex: '02',
    takeaways: [
      'Thị trường lớn không tự động tạo hiệu quả nếu vận hành thiếu dữ liệu.',
      'Khoảng trống số hóa nằm ở lớp điều phối và đối soát công trường.',
      'Platform-first là hướng mở rộng phù hợp với thị trường phân mảnh.',
    ],
    sections: [
      {
        heading: 'Nhu cầu tăng từ các dự án hạ tầng',
        paragraphs: [
          'Các dự án cao tốc, sân bay, khu công nghiệp và đô thị mới tạo ra nhu cầu vận chuyển đất đá, cát, vật liệu san lấp và cấu kiện xây dựng với cường độ cao.',
          'Khối lượng lớn làm lộ rõ chi phí của vận hành thủ công: xe chờ lâu, tuyến thiếu tối ưu, phiếu thất lạc và thanh toán chậm.',
        ],
      },
      {
        heading: 'Số hóa thấp vì bài toán quá đặc thù',
        paragraphs: [
          'Vận tải công trình không giống giao hàng đô thị. Mỗi dự án có quy trình nghiệm thu riêng, địa hình riêng, mỏ vật liệu riêng và yêu cầu chứng từ riêng.',
          'Một nền tảng hiệu quả cần hiểu cả đội xe, tuyến công trường, khối lượng, ca làm việc và quan hệ giữa chủ đầu tư - tổng thầu - đội xe.',
        ],
      },
      {
        heading: 'Cơ hội cho nền tảng theo cụm',
        paragraphs: [
          'Thị trường phân mảnh tạo cơ hội cho mô hình mở rộng theo cụm địa phương: chuẩn hóa một vùng dự án, kết nối đội xe và mỏ vật liệu trước khi nhân rộng.',
          'Đó là cách BenHub tiếp cận bài toán: đi từ dữ liệu vận hành thực tế đến mạng lưới có khả năng mở rộng.',
        ],
      },
    ],
  },
  {
    slug: 'e-ticket-doi-soat-chuyen-xe',
    icon: 'ticket',
    categoryId: 'cong-nghe',
    tags: ['e-ticket', 'gps', 'product', 'digital', 'payment'],
    isFeatured: false,
    title: 'E-Ticket thay đổi cách đối soát chuyến xe như thế nào?',
    excerpt:
      'Từ mã QR, tọa độ GPS đến dấu thời gian, phiếu điện tử giúp giảm tranh cãi và rút ngắn chu kỳ thanh toán.',
    sapo:
      'Phiếu giấy từng là bằng chứng quan trọng nhất của chuyến xe. Nhưng trong môi trường nhiều bên và khối lượng lớn, phiếu giấy tạo ra quá nhiều độ trễ và tranh cãi.',
    date: '08.05.2026',
    readTime: '4 phút đọc',
    author: {
      name: 'BenHub Product Team',
      title: 'Product tại BenHub',
      initials: 'BP',
      bio: 'Nhóm sản phẩm BenHub chịu trách nhiệm xây dựng và phát triển các tính năng cốt lõi của nền tảng.',
    },
    heroIndex: '03',
    takeaways: [
      'E-Ticket giúp mỗi chuyến xe có bằng chứng số ngay khi phát sinh.',
      'QR, GPS và timestamp làm giảm rủi ro sửa phiếu hoặc mất phiếu.',
      'Đối soát nhanh hơn khi dữ liệu được chuẩn hóa từ đầu.',
    ],
    sections: [
      {
        heading: 'Phiếu giấy làm chậm toàn bộ chu kỳ thanh toán',
        paragraphs: [
          'Một phiếu thất lạc có thể làm chậm thanh toán của nhiều chuyến xe. Một thông tin viết sai có thể tạo tranh cãi giữa tài xế, đội xe và công trường.',
          'E-Ticket chuyển bằng chứng chuyến xe thành dữ liệu có cấu trúc: ai chạy, xe nào, tuyến nào, thời điểm nào và khối lượng nào.',
        ],
      },
      {
        heading: 'Bằng chứng vận hành đi cùng chuyến xe',
        paragraphs: [
          'Mỗi E-Ticket có thể gắn mã QR, dấu thời gian, tọa độ GPS và trạng thái nghiệm thu. Điều này giúp các bên xác minh chuyến xe ngay khi cần.',
          'Khi kết hợp với tracking hành trình, E-Ticket không còn là một ảnh chụp cuối chuyến, mà là một phần của dòng dữ liệu vận hành.',
        ],
      },
      {
        heading: 'Nền tảng cho tài chính đội xe',
        paragraphs: [
          'Khi chuyến xe được xác thực nhanh hơn, đội xe có cơ sở để nhận thanh toán hoặc ứng tiền sớm hơn.',
          'Đây là một lớp quan trọng để BenHub Finance có thể hỗ trợ dòng tiền mà không làm tăng rủi ro đối soát.',
        ],
      },
    ],
  },
  {
    slug: 'gps-tracking-du-lieu-van-hanh',
    icon: 'route',
    categoryId: 'cong-nghe',
    tags: ['gps', 'tracking', 'data', 'ai', 'dispatch'],
    isFeatured: false,
    title: 'GPS tracking không chỉ để biết xe đang ở đâu',
    excerpt:
      'Dữ liệu hành trình giúp phát hiện lệch tuyến, dừng bất thường, thiếu tải và tạo nền tảng cho điều phối tự động.',
    sapo:
      'Bản đồ realtime chỉ là phần dễ thấy nhất. Giá trị lớn hơn của GPS nằm ở việc biến hành trình thành dữ liệu để phân tích và tối ưu.',
    date: '30.04.2026',
    readTime: '7 phút đọc',
    author: {
      name: 'BenHub Data Team',
      title: 'Data & Engineering tại BenHub',
      initials: 'BD',
      bio: 'Đội kỹ thuật dữ liệu BenHub xây dựng hạ tầng thu thập, xử lý và phân tích dữ liệu vận hành thực địa.',
    },
    heroIndex: '04',
    takeaways: [
      'GPS giúp phát hiện rủi ro vận hành trước khi thành tổn thất.',
      'Dữ liệu tuyến là đầu vào quan trọng cho AI Smart Dispatch.',
      'Tracking cần gắn với lệnh vận chuyển và E-Ticket để có ngữ cảnh.',
    ],
    sections: [
      {
        heading: 'Vị trí chỉ có ý nghĩa khi có ngữ cảnh',
        paragraphs: [
          'Một điểm GPS đơn lẻ không nói lên nhiều điều. Nó chỉ hữu ích khi được gắn với lệnh vận chuyển, tuyến được duyệt, điểm nhận - trả và trạng thái chuyến.',
          'Khi có ngữ cảnh, hệ thống có thể phát hiện xe dừng bất thường, đi lệch tuyến hoặc mất quá nhiều thời gian ở điểm bốc dỡ.',
        ],
      },
      {
        heading: 'Từ giám sát sang tối ưu',
        paragraphs: [
          'Ban đầu GPS giúp giám sát. Khi dữ liệu đủ dày, nó giúp tính thời gian quay vòng, năng suất theo tuyến và khả năng đáp ứng của từng đội xe.',
          'Đó là đầu vào để điều phối tự động chọn xe phù hợp hơn thay vì chỉ chọn xe gần nhất.',
        ],
      },
      {
        heading: 'Dữ liệu hành trình tạo niềm tin',
        paragraphs: [
          'Chủ đầu tư cần niềm tin vào khối lượng và tiến độ. Đội xe cần niềm tin rằng chuyến đã chạy sẽ được ghi nhận đúng.',
          'Tracking minh bạch giúp hai phía nhìn cùng một chuỗi sự kiện thay vì tranh luận từ ký ức hoặc giấy tờ rời rạc.',
        ],
      },
    ],
  },
  {
    slug: 'doi-xe-dia-phuong-platform-first',
    icon: 'fleet',
    categoryId: 'tin-benhub',
    tags: ['fleet', 'local', 'platform', 'expansion', 'network'],
    isFeatured: false,
    title: 'Đội xe địa phương trong mô hình logistics platform-first',
    excerpt:
      'Khi đội xe được kết nối vào một chuẩn dữ liệu chung, năng lực vận hành địa phương có thể mở rộng nhanh hơn.',
    sapo:
      'Đội xe địa phương là lớp năng lực quan trọng nhất của vận tải công trình. Bài toán không phải thay thế họ, mà là giúp họ vận hành bằng chuẩn dữ liệu tốt hơn.',
    date: '24.04.2026',
    readTime: '5 phút đọc',
    author: {
      name: 'BenHub Operations',
      title: 'Operations tại BenHub',
      initials: 'BO',
      bio: 'Đội vận hành BenHub làm việc trực tiếp với đội xe, tài xế và công trường để tối ưu hóa quy trình vận tải.',
    },
    heroIndex: '05',
    takeaways: [
      'Đội xe địa phương có lợi thế vùng, quan hệ và hiểu tuyến.',
      'Platform giúp chuẩn hóa quy trình mà không làm mất năng lực địa phương.',
      'Dữ liệu doanh thu và hiệu suất giúp đội xe ra quyết định tốt hơn.',
    ],
    sections: [
      {
        heading: 'Lợi thế địa phương cần được số hóa',
        paragraphs: [
          'Đội xe địa phương hiểu tuyến đường, điểm bốc dỡ, khung giờ công trường và năng lực tài xế. Đây là lợi thế mà một mô hình tập trung khó thay thế.',
          'Khi lợi thế đó được đưa lên nền tảng, đội xe có thể nhận việc đều hơn và chứng minh năng lực bằng dữ liệu.',
        ],
      },
      {
        heading: 'Chuẩn chung cho nhiều đội xe',
        paragraphs: [
          'Một dự án lớn thường cần nhiều đội xe cùng chạy. Nếu mỗi đội dùng một cách ghi nhận khác nhau, tổng thầu rất khó đối soát.',
          'BenHub tạo chuẩn chung cho lệnh vận chuyển, ticket, tracking và báo cáo để nhiều đội xe có thể tham gia cùng một mạng lưới.',
        ],
      },
      {
        heading: 'Mở rộng mà không tăng hỗn loạn',
        paragraphs: [
          'Mở rộng số lượng xe nhưng không chuẩn hóa dữ liệu sẽ làm tăng độ phức tạp. Platform-first giúp tăng quy mô mà vẫn giữ được kiểm soát.',
          'Đây là nền tảng để xây các cụm vận tải số theo tỉnh, theo dự án hoặc theo chuỗi vật liệu.',
        ],
      },
    ],
  },
  {
    slug: 'minh-bach-du-lieu-hop-tac-dai-han',
    icon: 'trust',
    categoryId: 'case-study',
    tags: ['partnership', 'trust', 'data', 'transparency', 'collaboration'],
    isFeatured: false,
    title: 'Minh bạch dữ liệu là nền tảng để hợp tác dài hạn',
    excerpt:
      'Chủ đầu tư, tổng thầu, đội xe và mỏ vật liệu cần một nguồn dữ liệu xác thực để giảm rủi ro vận hành.',
    sapo:
      'Hợp tác trong xây dựng thường kéo dài qua nhiều tháng, nhiều giai đoạn và nhiều nhà thầu. Dữ liệu minh bạch giúp giảm rủi ro ngay từ nền móng quan hệ.',
    date: '18.04.2026',
    readTime: '6 phút đọc',
    author: {
      name: 'BenHub Partnership',
      title: 'Partnerships tại BenHub',
      initials: 'BP',
      bio: 'Đội quan hệ đối tác BenHub xây dựng và duy trì mạng lưới hợp tác với các chủ đầu tư, tổng thầu và tổ chức tài chính.',
    },
    heroIndex: '06',
    takeaways: [
      'Minh bạch dữ liệu làm giảm chi phí kiểm tra thủ công.',
      'Một nguồn dữ liệu chung giúp các bên ra quyết định nhanh hơn.',
      'Quan hệ đối tác bền hơn khi tranh cãi vận hành giảm xuống.',
    ],
    sections: [
      {
        heading: 'Mỗi bên thường giữ một phiên bản dữ liệu',
        paragraphs: [
          'Chủ đầu tư có báo cáo riêng, tổng thầu có bảng riêng, đội xe có phiếu riêng và mỏ vật liệu có ghi nhận riêng. Khi số liệu lệch nhau, đối soát trở thành một vòng thương lượng.',
          'Một nền tảng chung giúp giảm sự phụ thuộc vào việc tổng hợp thủ công cuối kỳ.',
        ],
      },
      {
        heading: 'Minh bạch không chỉ là giám sát',
        paragraphs: [
          'Minh bạch dữ liệu không nhằm tạo thêm áp lực cho một bên. Mục tiêu là tạo một nền tảng tin cậy để mọi bên được ghi nhận đúng.',
          'Tài xế có chuyến xe rõ ràng, đội xe có doanh thu rõ ràng, chủ đầu tư có tiến độ rõ ràng và đối tác tài chính có rủi ro rõ ràng.',
        ],
      },
      {
        heading: 'Dữ liệu là nền móng của hợp tác dài hạn',
        paragraphs: [
          'Khi một dự án vận hành tốt, dữ liệu đó trở thành bằng chứng năng lực cho dự án tiếp theo.',
          'BenHub muốn biến mỗi cụm hợp tác thành một tài sản vận hành có thể tái sử dụng và mở rộng.',
        ],
      },
    ],
  },
  {
    slug: 'benhub-mo-rong-mang-luoi-doi-tac',
    icon: 'broadcast',
    categoryId: 'tin-benhub',
    tags: ['benhub', 'expansion', 'partnership', 'network', 'milestone'],
    isFeatured: false,
    title: 'BenHub mở rộng mạng lưới đối tác vận tải công trình',
    excerpt:
      'Cập nhật định hướng hợp tác cùng các cụm đội xe, dự án hạ tầng và tổ chức tài chính trong năm 2026.',
    sapo:
      'Năm 2026, BenHub tập trung mở rộng mạng lưới đối tác theo các cụm vận hành có nhu cầu rõ ràng và khả năng chuẩn hóa dữ liệu nhanh.',
    date: '10.04.2026',
    readTime: '3 phút đọc',
    author: {
      name: 'BenHub Vietnam',
      title: 'Editorial tại BenHub',
      initials: 'BV',
      bio: 'Đội truyền thông BenHub chia sẻ cập nhật mới nhất về sản phẩm, đội ngũ và định hướng phát triển.',
    },
    heroIndex: '07',
    takeaways: [
      'BenHub ưu tiên cụm dự án có nhu cầu vận tải lớn và lặp lại.',
      'Đối tác đội xe, mỏ vật liệu và tài chính là ba lớp quan trọng.',
      'Mục tiêu là tạo các pilot có KPI vận hành đo được.',
    ],
    sections: [
      {
        heading: 'Mở rộng từ các cụm vận hành thực',
        paragraphs: [
          'Thay vì mở rộng đại trà, BenHub ưu tiên các cụm có dự án đang chạy, đội xe sẵn có và nhu cầu đối soát rõ ràng.',
          'Cách tiếp cận này giúp nền tảng học từ dữ liệu thực và tạo kết quả đo được trong thời gian ngắn.',
        ],
      },
      {
        heading: 'Ba nhóm đối tác trọng tâm',
        paragraphs: [
          'Đội xe địa phương giúp đảm bảo năng lực vận chuyển. Mỏ vật liệu và trạm cung ứng giúp chuẩn hóa nguồn hàng. Tổ chức tài chính giúp mở lớp ứng tiền và dòng tiền cho đội xe.',
          'Khi ba nhóm này cùng kết nối vào một luồng dữ liệu, hiệu quả vận hành tăng lên rõ rệt.',
        ],
      },
      {
        heading: 'Từ pilot đến mạng lưới',
        paragraphs: [
          'Mỗi pilot thành công sẽ được chuẩn hóa thành playbook: chỉ số vận hành, quy trình onboarding, mẫu dữ liệu và cơ chế đối soát.',
          'Đó là cách BenHub xây nền tảng cho mạng lưới vận tải công trình có thể nhân rộng toàn quốc.',
        ],
      },
    ],
  },
]

export const featuredNewsPost = newsPosts.find((p) => p.isFeatured) ?? newsPosts[0]

export function getCategoryById(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]
}

export function getNewsPostBySlug(slug: string): NewsPost | undefined {
  return newsPosts.find((p) => p.slug === slug)
}

export function getRelatedNewsPosts(slug: string, limit = 3): NewsPost[] {
  const post = getNewsPostBySlug(slug)
  if (!post) return newsPosts.slice(0, limit)
  const sameCat = newsPosts.filter((p) => p.slug !== slug && p.categoryId === post.categoryId)
  const otherCat = newsPosts.filter((p) => p.slug !== slug && p.categoryId !== post.categoryId)
  return [...sameCat, ...otherCat].slice(0, limit)
}
