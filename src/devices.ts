export type DeviceBrand = 'iQOO' | (string & {})

export interface DeviceItem {
	brand: DeviceBrand
	name: string
	series?: string
	desc?: string
	image: string
	url?: string
	scale?: number
}

export default {
	brands: ['iQOO'] as DeviceBrand[],
	items: [
		{
			brand: 'iQOO',
			name: 'iQOO 11',
			series: '16GB+512GB 曼岛特别版',
			desc: '第二代骁龙 8|2K 144Hz E6 全感屏|自研芯片 V2|120W超快闪充|全感操控系统',
			image: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/52/10007952_1669636269985_750x750.png.webp',
			url: 'https://shop.vivo.com.cn/product/10007952?skuId=125337',
        },
		{
			brand: 'iQOO',
			name: 'iQOO TWS 1e',
			series: '真无线降噪耳机 星珠黄',
			desc: '44h 超⻓续航 | 智能主动降噪 | 55ms 全链路游戏低延迟（温馨提示：本产品标配不含充电线）',
			image: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/86/10009286_1702631065572_750x750.png.webp',
			url: 'https://shop.vivo.com.cn/product/10009286?skuId=130649',
		},
	],
}