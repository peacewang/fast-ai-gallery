// 朝代数据（TypeScript版本，避免JSON导入问题）
import type { Dynasty } from '../types';

export const dynastiesData: { dynasties: Dynasty[] } = {
  dynasties: [
    {
      id: "xia",
      name: "夏朝",
      startYear: -2070,
      endYear: -1600,
      founder: "禹",
      capital: ["阳城", "斟鄩"],
      territory: {
        description: "主要位于黄河流域中下游地区"
      },
      majorEvents: [
        {
          year: -2070,
          title: "大禹治水",
          description: "大禹成功治理洪水，奠定夏朝建立基础",
          category: "political",
          impact: "high"
        },
        {
          year: -2000,
          title: "建立世袭制",
          description: "启继承禹位，确立世袭制，标志着\"家天下\"的开始",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "末代君主夏桀暴政",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "统治阶层腐败",
          category: "internal",
          severity: "major"
        }
      ],
      fallDetails: {
        year: -1600,
        cause: "商汤伐桀",
        successor: "商朝"
      },
      culturalAchievements: [
        "建立世袭制",
        "制定历法",
        "发展青铜器制作"
      ],
      notableFigures: [
        {
          name: "大禹",
          role: "开国君主",
          period: "约公元前2070年"
        },
        {
          name: "启",
          role: "第二代君主",
          period: "约公元前2050年"
        }
      ],
      color: "#8B4513",
      icon: "crown"
    },
    {
      id: "shang",
      name: "商朝",
      startYear: -1600,
      endYear: -1046,
      founder: "汤",
      capital: ["亳", "殷"],
      territory: {
        description: "以黄河流域为中心，疆域较夏朝有所扩大"
      },
      majorEvents: [
        {
          year: -1600,
          title: "商汤灭夏",
          description: "商汤在鸣条之战中击败夏桀，建立商朝",
          category: "military",
          impact: "high"
        },
        {
          year: -1300,
          title: "盘庚迁殷",
          description: "盘庚将都城迁至殷，商朝进入稳定发展期",
          category: "political",
          impact: "high"
        },
        {
          year: -1200,
          title: "武丁中兴",
          description: "武丁时期商朝国力达到鼎盛",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "末代君主商纣王暴政",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "连年对外战争消耗国力",
          category: "military",
          severity: "major"
        }
      ],
      fallDetails: {
        year: -1046,
        cause: "周武王伐纣，牧野之战",
        successor: "周朝"
      },
      culturalAchievements: [
        "甲骨文",
        "青铜器制作达到高峰",
        "完善历法"
      ],
      notableFigures: [
        {
          name: "汤",
          role: "开国君主",
          period: "约公元前1600年"
        },
        {
          name: "盘庚",
          role: "君主",
          period: "约公元前1300年"
        },
        {
          name: "武丁",
          role: "君主",
          period: "约公元前1200年"
        }
      ],
      color: "#CD853F",
      icon: "crown"
    },
    {
      id: "zhou",
      name: "周朝",
      startYear: -1046,
      endYear: -256,
      founder: "周武王",
      capital: ["镐京", "洛邑"],
      territory: {
        description: "疆域大幅扩展，实行分封制，控制范围包括黄河流域和长江流域部分地区"
      },
      majorEvents: [
        {
          year: -1046,
          title: "牧野之战",
          description: "周武王在牧野击败商军，建立周朝",
          category: "military",
          impact: "high"
        },
        {
          year: -771,
          title: "犬戎攻破镐京",
          description: "西周灭亡，平王东迁，进入东周时期",
          category: "military",
          impact: "high"
        },
        {
          year: -770,
          title: "平王东迁",
          description: "周平王迁都洛邑，东周开始",
          category: "political",
          impact: "high"
        },
        {
          year: -475,
          title: "进入战国时期",
          description: "各诸侯国争霸加剧，周王室名存实亡",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "分封制导致诸侯割据",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "周王室权威衰落",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "诸侯国实力增强",
          category: "internal",
          severity: "major"
        }
      ],
      fallDetails: {
        year: -256,
        cause: "秦灭周，周朝正式灭亡",
        successor: "秦朝"
      },
      culturalAchievements: [
        "礼乐制度",
        "分封制",
        "《诗经》",
        "《周易》",
        "春秋战国思想繁荣"
      ],
      notableFigures: [
        {
          name: "周武王",
          role: "开国君主",
          period: "约公元前1046年"
        },
        {
          name: "周公",
          role: "政治家",
          period: "约公元前1040年"
        },
        {
          name: "孔子",
          role: "思想家",
          period: "春秋时期"
        }
      ],
      color: "#4169E1",
      icon: "crown"
    },
    {
      id: "qin",
      name: "秦朝",
      startYear: -221,
      endYear: -207,
      founder: "秦始皇",
      capital: ["咸阳"],
      territory: {
        description: "统一六国，建立中国历史上第一个统一的中央集权制国家，疆域空前辽阔"
      },
      majorEvents: [
        {
          year: -221,
          title: "统一六国",
          description: "秦始皇完成统一，建立秦朝",
          category: "military",
          impact: "high"
        },
        {
          year: -221,
          title: "统一文字、货币、度量衡",
          description: "实行\"书同文，车同轨\"，统一全国制度",
          category: "political",
          impact: "high"
        },
        {
          year: -214,
          title: "修建万里长城",
          description: "连接和修缮战国长城，形成万里长城",
          category: "military",
          impact: "high"
        },
        {
          year: -210,
          title: "秦始皇驾崩",
          description: "秦始皇在巡游途中病逝",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "严刑峻法，民怨沸腾",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "赋税徭役过重",
          category: "economic",
          severity: "critical"
        },
        {
          reason: "秦二世昏庸无能",
          category: "internal",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: -207,
        cause: "陈胜吴广起义，刘邦项羽灭秦",
        successor: "汉朝"
      },
      culturalAchievements: [
        "统一文字",
        "统一度量衡",
        "修建长城",
        "修建驰道"
      ],
      notableFigures: [
        {
          name: "秦始皇",
          role: "开国皇帝",
          period: "公元前221-210年"
        },
        {
          name: "李斯",
          role: "丞相",
          period: "秦朝"
        }
      ],
      color: "#2F4F4F",
      icon: "crown"
    },
    {
      id: "han",
      name: "汉朝",
      startYear: -202,
      endYear: 220,
      founder: "汉高祖刘邦",
      capital: ["长安", "洛阳"],
      territory: {
        description: "疆域辽阔，东至朝鲜，西至西域，南至交趾，北至大漠"
      },
      majorEvents: [
        {
          year: -202,
          title: "楚汉之争结束",
          description: "刘邦在垓下之战击败项羽，建立汉朝",
          category: "military",
          impact: "high"
        },
        {
          year: -141,
          title: "汉武帝即位",
          description: "汉武帝开始，汉朝进入鼎盛时期",
          category: "political",
          impact: "high"
        },
        {
          year: -138,
          title: "张骞出使西域",
          description: "开辟丝绸之路，促进中外交流",
          category: "cultural",
          impact: "high"
        },
        {
          year: 9,
          title: "王莽篡汉",
          description: "王莽建立新朝，西汉灭亡",
          category: "political",
          impact: "high"
        },
        {
          year: 25,
          title: "光武帝建立东汉",
          description: "刘秀重建汉朝，定都洛阳",
          category: "political",
          impact: "high"
        },
        {
          year: 184,
          title: "黄巾起义",
          description: "大规模农民起义，加速东汉灭亡",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "外戚宦官专权",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "土地兼并严重",
          category: "economic",
          severity: "major"
        },
        {
          reason: "农民起义不断",
          category: "internal",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: 220,
        cause: "曹丕篡汉，汉献帝退位",
        successor: "三国"
      },
      culturalAchievements: [
        "《史记》",
        "造纸术",
        "丝绸之路",
        "儒家思想成为正统"
      ],
      notableFigures: [
        {
          name: "汉高祖刘邦",
          role: "开国皇帝",
          period: "公元前202-195年"
        },
        {
          name: "汉武帝",
          role: "皇帝",
          period: "公元前141-87年"
        },
        {
          name: "司马迁",
          role: "史学家",
          period: "西汉"
        }
      ],
      color: "#FF6347",
      icon: "crown"
    },
    {
      id: "sanguo",
      name: "三国",
      startYear: 220,
      endYear: 280,
      founder: "魏：曹丕 / 蜀：刘备 / 吴：孙权",
      capital: ["洛阳", "成都", "建业"],
      territory: {
        description: "魏占据北方，蜀占据西南，吴占据东南"
      },
      majorEvents: [
        {
          year: 220,
          title: "曹丕称帝",
          description: "曹丕篡汉，建立魏国",
          category: "political",
          impact: "high"
        },
        {
          year: 221,
          title: "刘备称帝",
          description: "刘备在成都称帝，建立蜀汉",
          category: "political",
          impact: "high"
        },
        {
          year: 222,
          title: "孙权称王",
          description: "孙权建立吴国",
          category: "political",
          impact: "high"
        },
        {
          year: 280,
          title: "西晋统一",
          description: "西晋灭吴，统一全国",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "三国相互征伐，消耗国力",
          category: "military",
          severity: "critical"
        },
        {
          reason: "内部政治斗争激烈",
          category: "internal",
          severity: "major"
        }
      ],
      fallDetails: {
        year: 280,
        cause: "西晋统一三国",
        successor: "晋朝"
      },
      culturalAchievements: [
        "《三国志》",
        "建安文学",
        "诸葛亮发明",
        "医学发展"
      ],
      notableFigures: [
        {
          name: "曹操",
          role: "政治家、军事家",
          period: "三国"
        },
        {
          name: "诸葛亮",
          role: "政治家、军事家",
          period: "三国"
        },
        {
          name: "周瑜",
          role: "军事家",
          period: "三国"
        }
      ],
      color: "#9370DB",
      icon: "crown"
    },
    {
      id: "jin",
      name: "晋朝",
      startYear: 265,
      endYear: 420,
      founder: "晋武帝司马炎",
      capital: ["洛阳", "建康"],
      territory: {
        description: "西晋统一全国，东晋偏安江南"
      },
      majorEvents: [
        {
          year: 265,
          title: "西晋建立",
          description: "司马炎篡魏，建立西晋",
          category: "political",
          impact: "high"
        },
        {
          year: 280,
          title: "统一全国",
          description: "西晋灭吴，统一全国",
          category: "military",
          impact: "high"
        },
        {
          year: 316,
          title: "西晋灭亡",
          description: "匈奴攻破长安，西晋灭亡",
          category: "military",
          impact: "high"
        },
        {
          year: 317,
          title: "东晋建立",
          description: "司马睿在建康建立东晋",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "八王之乱导致国力衰弱",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "外族入侵",
          category: "external",
          severity: "critical"
        },
        {
          reason: "门阀政治腐败",
          category: "internal",
          severity: "major"
        }
      ],
      fallDetails: {
        year: 420,
        cause: "刘裕篡晋，建立宋朝",
        successor: "南北朝"
      },
      culturalAchievements: [
        "玄学兴起",
        "书法艺术",
        "山水诗",
        "《世说新语》"
      ],
      notableFigures: [
        {
          name: "晋武帝司马炎",
          role: "开国皇帝",
          period: "265-290年"
        },
        {
          name: "王羲之",
          role: "书法家",
          period: "东晋"
        },
        {
          name: "陶渊明",
          role: "诗人",
          period: "东晋"
        }
      ],
      color: "#4B0082",
      icon: "crown"
    },
    {
      id: "nanbeichao",
      name: "南北朝",
      startYear: 420,
      endYear: 589,
      founder: "南朝：刘裕 / 北朝：拓跋珪",
      capital: ["建康", "平城", "洛阳"],
      territory: {
        description: "南朝控制江南，北朝控制北方"
      },
      majorEvents: [
        {
          year: 420,
          title: "南朝宋建立",
          description: "刘裕建立宋朝，南朝开始",
          category: "political",
          impact: "high"
        },
        {
          year: 439,
          title: "北魏统一北方",
          description: "北魏统一北方十六国",
          category: "military",
          impact: "high"
        },
        {
          year: 494,
          title: "北魏迁都洛阳",
          description: "孝文帝迁都洛阳，推行汉化",
          category: "political",
          impact: "high"
        },
        {
          year: 589,
          title: "隋朝统一",
          description: "隋朝统一南北，南北朝结束",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "南北长期分裂，战乱不断",
          category: "military",
          severity: "critical"
        },
        {
          reason: "政治腐败，社会动荡",
          category: "internal",
          severity: "major"
        }
      ],
      fallDetails: {
        year: 589,
        cause: "隋朝统一全国",
        successor: "隋朝"
      },
      culturalAchievements: [
        "佛教兴盛",
        "石窟艺术",
        "文学发展",
        "科技进步"
      ],
      notableFigures: [
        {
          name: "刘裕",
          role: "南朝宋开国皇帝",
          period: "420-422年"
        },
        {
          name: "拓跋珪",
          role: "北魏开国皇帝",
          period: "386-409年"
        },
        {
          name: "祖冲之",
          role: "数学家、天文学家",
          period: "南北朝"
        }
      ],
      color: "#8A2BE2",
      icon: "crown"
    },
    {
      id: "sui",
      name: "隋朝",
      startYear: 581,
      endYear: 618,
      founder: "隋文帝杨坚",
      capital: ["大兴", "洛阳"],
      territory: {
        description: "统一全国，疆域辽阔"
      },
      majorEvents: [
        {
          year: 581,
          title: "隋朝建立",
          description: "杨坚建立隋朝",
          category: "political",
          impact: "high"
        },
        {
          year: 589,
          title: "统一全国",
          description: "隋朝统一南北，结束长期分裂",
          category: "military",
          impact: "high"
        },
        {
          year: 605,
          title: "开凿大运河",
          description: "隋炀帝开凿大运河",
          category: "economic",
          impact: "high"
        },
        {
          year: 618,
          title: "隋朝灭亡",
          description: "隋炀帝被杀，隋朝灭亡",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "隋炀帝暴政",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "连年征战，民不聊生",
          category: "military",
          severity: "critical"
        },
        {
          reason: "大运河工程劳民伤财",
          category: "economic",
          severity: "major"
        }
      ],
      fallDetails: {
        year: 618,
        cause: "农民起义，隋炀帝被杀",
        successor: "唐朝"
      },
      culturalAchievements: [
        "开凿大运河",
        "统一货币",
        "科举制度",
        "建筑艺术"
      ],
      notableFigures: [
        {
          name: "隋文帝杨坚",
          role: "开国皇帝",
          period: "581-604年"
        },
        {
          name: "隋炀帝杨广",
          role: "皇帝",
          period: "604-618年"
        }
      ],
      color: "#2E8B57",
      icon: "crown"
    },
    {
      id: "tang",
      name: "唐朝",
      startYear: 618,
      endYear: 907,
      founder: "唐高祖李渊",
      capital: ["长安", "洛阳"],
      territory: {
        description: "疆域空前辽阔，东至朝鲜，西至中亚，南至越南，北至蒙古"
      },
      majorEvents: [
        {
          year: 618,
          title: "唐朝建立",
          description: "李渊建立唐朝",
          category: "political",
          impact: "high"
        },
        {
          year: 626,
          title: "玄武门之变",
          description: "李世民发动政变，成为太子",
          category: "political",
          impact: "high"
        },
        {
          year: 627,
          title: "贞观之治",
          description: "李世民即位，开创贞观之治",
          category: "political",
          impact: "high"
        },
        {
          year: 690,
          title: "武则天称帝",
          description: "武则天建立周朝，成为中国唯一女皇帝",
          category: "political",
          impact: "high"
        },
        {
          year: 713,
          title: "开元盛世",
          description: "唐玄宗开创开元盛世",
          category: "political",
          impact: "high"
        },
        {
          year: 755,
          title: "安史之乱",
          description: "安禄山、史思明发动叛乱",
          category: "military",
          impact: "high"
        },
        {
          year: 907,
          title: "唐朝灭亡",
          description: "朱温篡唐，建立后梁",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "安史之乱导致国力衰弱",
          category: "military",
          severity: "critical"
        },
        {
          reason: "藩镇割据",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "宦官专权",
          category: "internal",
          severity: "major"
        },
        {
          reason: "农民起义",
          category: "internal",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: 907,
        cause: "朱温篡唐，建立后梁",
        successor: "五代十国"
      },
      culturalAchievements: [
        "唐诗",
        "书法艺术",
        "绘画艺术",
        "丝绸之路",
        "佛教文化",
        "科技发展"
      ],
      notableFigures: [
        {
          name: "唐太宗李世民",
          role: "皇帝",
          period: "626-649年"
        },
        {
          name: "武则天",
          role: "皇帝",
          period: "690-705年"
        },
        {
          name: "李白",
          role: "诗人",
          period: "唐朝"
        },
        {
          name: "杜甫",
          role: "诗人",
          period: "唐朝"
        }
      ],
      color: "#FFD700",
      icon: "crown"
    },
    {
      id: "wudai",
      name: "五代十国",
      startYear: 907,
      endYear: 979,
      founder: "后梁：朱温",
      capital: ["开封", "洛阳", "成都", "杭州"],
      territory: {
        description: "五代占据中原，十国分布在各地"
      },
      majorEvents: [
        {
          year: 907,
          title: "后梁建立",
          description: "朱温建立后梁，五代开始",
          category: "political",
          impact: "high"
        },
        {
          year: 923,
          title: "后唐建立",
          description: "李存勖建立后唐",
          category: "political",
          impact: "medium"
        },
        {
          year: 960,
          title: "北宋建立",
          description: "赵匡胤建立北宋",
          category: "political",
          impact: "high"
        },
        {
          year: 979,
          title: "北宋统一",
          description: "北宋统一全国，五代十国结束",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "政权更迭频繁，社会动荡",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "战乱不断，民不聊生",
          category: "military",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: 979,
        cause: "北宋统一全国",
        successor: "宋朝"
      },
      culturalAchievements: [
        "词的发展",
        "印刷术",
        "绘画艺术"
      ],
      notableFigures: [
        {
          name: "朱温",
          role: "后梁开国皇帝",
          period: "907-912年"
        },
        {
          name: "李煜",
          role: "南唐后主、词人",
          period: "五代十国"
        }
      ],
      color: "#A0522D",
      icon: "crown"
    },
    {
      id: "song",
      name: "宋朝",
      startYear: 960,
      endYear: 1279,
      founder: "宋太祖赵匡胤",
      capital: ["开封", "临安"],
      territory: {
        description: "北宋统一中原，南宋偏安江南"
      },
      majorEvents: [
        {
          year: 960,
          title: "北宋建立",
          description: "赵匡胤陈桥兵变，建立北宋",
          category: "political",
          impact: "high"
        },
        {
          year: 1127,
          title: "靖康之变",
          description: "金军攻破开封，北宋灭亡",
          category: "military",
          impact: "high"
        },
        {
          year: 1127,
          title: "南宋建立",
          description: "赵构在临安建立南宋",
          category: "political",
          impact: "high"
        },
        {
          year: 1279,
          title: "崖山海战",
          description: "元军灭南宋，宋朝彻底灭亡",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "重文轻武，军事实力弱",
          category: "military",
          severity: "critical"
        },
        {
          reason: "外敌入侵（辽、金、元）",
          category: "external",
          severity: "critical"
        },
        {
          reason: "政治腐败，党争激烈",
          category: "internal",
          severity: "major"
        }
      ],
      fallDetails: {
        year: 1279,
        cause: "元军灭南宋",
        successor: "元朝"
      },
      culturalAchievements: [
        "宋词",
        "理学",
        "活字印刷",
        "火药",
        "指南针",
        "绘画艺术",
        "瓷器"
      ],
      notableFigures: [
        {
          name: "宋太祖赵匡胤",
          role: "开国皇帝",
          period: "960-976年"
        },
        {
          name: "苏轼",
          role: "文学家",
          period: "北宋"
        },
        {
          name: "岳飞",
          role: "军事家",
          period: "南宋"
        },
        {
          name: "朱熹",
          role: "理学家",
          period: "南宋"
        }
      ],
      color: "#32CD32",
      icon: "crown"
    },
    {
      id: "liao",
      name: "辽朝",
      startYear: 916,
      endYear: 1125,
      founder: "辽太祖耶律阿保机",
      capital: ["上京", "中京"],
      territory: {
        description: "控制东北、蒙古和部分华北地区"
      },
      majorEvents: [
        {
          year: 916,
          title: "辽朝建立",
          description: "耶律阿保机建立辽朝",
          category: "political",
          impact: "high"
        },
        {
          year: 1004,
          title: "澶渊之盟",
          description: "辽宋签订澶渊之盟",
          category: "political",
          impact: "high"
        },
        {
          year: 1125,
          title: "辽朝灭亡",
          description: "金朝灭辽",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "内部矛盾激化",
          category: "internal",
          severity: "major"
        },
        {
          reason: "金朝崛起",
          category: "external",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: 1125,
        cause: "金朝灭辽",
        successor: "金朝"
      },
      culturalAchievements: [
        "契丹文字",
        "游牧文化",
        "建筑艺术"
      ],
      notableFigures: [
        {
          name: "辽太祖耶律阿保机",
          role: "开国皇帝",
          period: "916-926年"
        }
      ],
      color: "#8B008B",
      icon: "crown"
    },
    {
      id: "jindynasty",
      name: "金朝",
      startYear: 1115,
      endYear: 1234,
      founder: "金太祖完颜阿骨打",
      capital: ["会宁", "中都"],
      territory: {
        description: "控制东北、华北和部分中原地区"
      },
      majorEvents: [
        {
          year: 1115,
          title: "金朝建立",
          description: "完颜阿骨打建立金朝",
          category: "political",
          impact: "high"
        },
        {
          year: 1125,
          title: "灭辽",
          description: "金朝灭辽",
          category: "military",
          impact: "high"
        },
        {
          year: 1127,
          title: "攻破开封",
          description: "金军攻破开封，北宋灭亡",
          category: "military",
          impact: "high"
        },
        {
          year: 1234,
          title: "金朝灭亡",
          description: "蒙古灭金",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "蒙古崛起",
          category: "external",
          severity: "critical"
        },
        {
          reason: "内部矛盾",
          category: "internal",
          severity: "major"
        }
      ],
      fallDetails: {
        year: 1234,
        cause: "蒙古灭金",
        successor: "元朝"
      },
      culturalAchievements: [
        "女真文字",
        "建筑艺术"
      ],
      notableFigures: [
        {
          name: "金太祖完颜阿骨打",
          role: "开国皇帝",
          period: "1115-1123年"
        }
      ],
      color: "#FF4500",
      icon: "crown"
    },
    {
      id: "yuan",
      name: "元朝",
      startYear: 1271,
      endYear: 1368,
      founder: "元世祖忽必烈",
      capital: ["大都"],
      territory: {
        description: "疆域空前辽阔，横跨欧亚大陆"
      },
      majorEvents: [
        {
          year: 1271,
          title: "元朝建立",
          description: "忽必烈建立元朝",
          category: "political",
          impact: "high"
        },
        {
          year: 1279,
          title: "统一全国",
          description: "元朝灭南宋，统一全国",
          category: "military",
          impact: "high"
        },
        {
          year: 1368,
          title: "元朝灭亡",
          description: "明军攻破大都，元朝灭亡",
          category: "military",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "民族矛盾尖锐",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "政治腐败",
          category: "internal",
          severity: "major"
        },
        {
          reason: "农民起义",
          category: "internal",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: 1368,
        cause: "明军攻破大都",
        successor: "明朝"
      },
      culturalAchievements: [
        "元曲",
        "青花瓷",
        "天文历法",
        "医学发展"
      ],
      notableFigures: [
        {
          name: "元世祖忽必烈",
          role: "开国皇帝",
          period: "1271-1294年"
        },
        {
          name: "关汉卿",
          role: "剧作家",
          period: "元朝"
        }
      ],
      color: "#000080",
      icon: "crown"
    },
    {
      id: "ming",
      name: "明朝",
      startYear: 1368,
      endYear: 1644,
      founder: "明太祖朱元璋",
      capital: ["南京", "北京"],
      territory: {
        description: "疆域辽阔，东至朝鲜，西至新疆，南至南海，北至蒙古"
      },
      majorEvents: [
        {
          year: 1368,
          title: "明朝建立",
          description: "朱元璋建立明朝",
          category: "political",
          impact: "high"
        },
        {
          year: 1405,
          title: "郑和下西洋",
          description: "郑和开始七下西洋",
          category: "cultural",
          impact: "high"
        },
        {
          year: 1421,
          title: "迁都北京",
          description: "明成祖迁都北京",
          category: "political",
          impact: "high"
        },
        {
          year: 1449,
          title: "土木堡之变",
          description: "明英宗被瓦剌俘虏",
          category: "military",
          impact: "high"
        },
        {
          year: 1644,
          title: "明朝灭亡",
          description: "李自成攻破北京，崇祯帝自缢",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "宦官专权",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "党争激烈",
          category: "internal",
          severity: "major"
        },
        {
          reason: "农民起义",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "外敌入侵（后金）",
          category: "external",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: 1644,
        cause: "李自成攻破北京，清军入关",
        successor: "清朝"
      },
      culturalAchievements: [
        "《永乐大典》",
        "小说发展",
        "瓷器艺术",
        "建筑艺术",
        "科技发展"
      ],
      notableFigures: [
        {
          name: "明太祖朱元璋",
          role: "开国皇帝",
          period: "1368-1398年"
        },
        {
          name: "明成祖朱棣",
          role: "皇帝",
          period: "1402-1424年"
        },
        {
          name: "郑和",
          role: "航海家",
          period: "明朝"
        }
      ],
      color: "#DC143C",
      icon: "crown"
    },
    {
      id: "qing",
      name: "清朝",
      startYear: 1644,
      endYear: 1912,
      founder: "清世祖顺治帝",
      capital: ["北京"],
      territory: {
        description: "疆域辽阔，是中国历史上最后一个封建王朝"
      },
      majorEvents: [
        {
          year: 1644,
          title: "清军入关",
          description: "清军入关，定都北京",
          category: "military",
          impact: "high"
        },
        {
          year: 1661,
          title: "康熙即位",
          description: "康熙帝即位，开启康乾盛世",
          category: "political",
          impact: "high"
        },
        {
          year: 1840,
          title: "鸦片战争",
          description: "第一次鸦片战争爆发",
          category: "military",
          impact: "high"
        },
        {
          year: 1911,
          title: "辛亥革命",
          description: "辛亥革命爆发",
          category: "political",
          impact: "high"
        },
        {
          year: 1912,
          title: "清朝灭亡",
          description: "清帝退位，清朝灭亡",
          category: "political",
          impact: "high"
        }
      ],
      declineReasons: [
        {
          reason: "闭关锁国，落后于世界",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "列强入侵",
          category: "external",
          severity: "critical"
        },
        {
          reason: "政治腐败，社会矛盾激化",
          category: "internal",
          severity: "critical"
        },
        {
          reason: "革命运动兴起",
          category: "internal",
          severity: "critical"
        }
      ],
      fallDetails: {
        year: 1912,
        cause: "辛亥革命，清帝退位",
        successor: "中华民国"
      },
      culturalAchievements: [
        "《四库全书》",
        "小说发展",
        "京剧",
        "绘画艺术",
        "建筑艺术"
      ],
      notableFigures: [
        {
          name: "康熙帝",
          role: "皇帝",
          period: "1661-1722年"
        },
        {
          name: "乾隆帝",
          role: "皇帝",
          period: "1735-1796年"
        },
        {
          name: "曹雪芹",
          role: "文学家",
          period: "清朝"
        }
      ],
      color: "#000000",
      icon: "crown"
    }
  ]
};

