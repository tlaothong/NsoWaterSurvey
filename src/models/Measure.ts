export class Measure {
    table1: any = {
        'name': 'หน่วยของความยาวหรือความกว้าง',
        'source': [
            '1 เซนติเมตร',
            '1 เมตร',
            '1 กิโลเมตร',
            '1 นิ้ว',
            '1 นิ้ว',
            '1 นิ้ว'],
        'dest': [
            '10 มิลลิเมตร',
            '100 เซนติเมตร',
            '1,000 เมตร',
            '0.0254 เมตร',
            '2.54 เซนติเมตร',
            '25.4 มิลลิเมตร']
    }
    table2: any = {
        'name': 'หน่วยของพื้นที่',
        'source': [
            '1 งาน',
            '1 ไร่',
            '1 ไร่',
            '1 ไร่',
            '1 ไร่',
            '1 ตาราเมตร',
            '1 งาน',
            '1 ตารางวา'],
        'dest': [
            '100 ตารางวา',
            '4 งาน',
            '400 ตารางวา',
            '1600 ตารางเมตร',
            '0.0016 ตารางกิโลเมตร',
            '10,000 ตารางเซนติเมตร',
            '400 ตารางเมตร',
            '4 ตารางเมตร']
    }
    table3: any = {
        'name': 'หน่วยของปริมาตรน้ำ',
        'source': [
            '1 มิลลิลิตร',
            '1 ลิตร',
            '1 ลิตร',
            '1 ลิตร',
            '1 ลิตร',
            '1 ลิตร',
            '1 ลูกบาศก์เมตร',
            '1 ลูกบาศก์เมตร',
            '1 ลูกบาศก์เมตร'],
        'dest': [
            '1 ลูกบาศก์เซนติเมตร หรือ ซีซี (cc)',
            '1,000 มิลลิเมตร',
            '1,000,000 ลูกบาศก์มิลลิเมตร',
            '1,000 ลูกบาซก์เซนติเมตร',
            '0.001 ลูกบาศก์เมตร',
            '1 กิโลกรัม',
            '1,000 ลิตร = 1 คิว',
            '1,000 กิโลกรัม ช 1 ตัน',
            '1,000,000 ลูกบาสก์เซนติเมตร']
    }
    table4: any = {
        'name': 'หน่วยของเวลา',
        'source': [
            '1 นาที',
            '1 ชั่วโมง',
            '1 วัน',
            '1 สัปดาห์',
            '1 สัปดาห์',
            '1 สัปดาห์',
            '1 เดือน',
            '1 เดือน',
            '1 ปี',
            '1 ปี',
            '1 ปี'
        ],
        'dest': [
            '60 วินาที',
            '60 นาที',
            '24 ชั่วโมง',
            '7 วัน',
            '168 ชั่วโมง',
            '1,080 นาที',
            'ประมาณ 30 วัน',
            'ประมาณ 4 สัปดาห์',
            '52 สัปดาห์',
            '12 เดือน',
            '365 วัน'
        ]
    }
    table5: any = {
        'name': 'ตารางเรียกหุน',
        'source': ['1 เซนติเมตร',
            '1 เมตร',
            '1 นิ้ว',
            '1 หุน',
            '2 หุน',
            '3 หุน',
            '4 หุน',
            '5 หุน',
            '6 หุน',
            '7 หุน',
            '8 หุน',
            '8 หุน',
            '8 หุน'],
        'dest': [
            '10 มิลลิเมตร',
            '100 เซนติเมตร',
            '2.54 เซนติเมตร',
            '1/8 นิ้ว',
            '2/8 นิ้ว หรือ 1/4 นื้ว',
            '3/8 นิ้ว',
            '4/8 นิ้ว หรือ 1/2 นิ้ว',
            '5/8 นิ้ว',
            ' 6/8 นิ้ว หรือ 3/4 นิ้ว',
            '7/8 นิ้ว ',
            '1 นิ้ว',
            '25.4 มิลลิเมตร',
            '2.54 เซนติเมตร'],
    }
    table6: any = {
        'name': 'หน่วยของกำลังเครื่องสูบน้ำ',
        'source': ['1 แรงม้า',
            '2 แรงม้า',
            '3 แรงม้า',
            '4 แรงม้า',
            '5 แรงม้า',
            '6 แรงม้า',
            '7 แรงม้า',
            '8 แรงม้า',
            '9 แรงม้า',
            '10 แรงม้า'],
        'dest': ['745.7 วัตต์',
            '1,491.4 วัตต์',
            '2,237.1 วัตต์',
            '2,982.8 วัตต์',
            '3,728.5 วัตต์',
            '4,474.2 วัตต์',
            '5,219.9 วัตต์',
            '5,965.6 วัตต์',
            '6,711.3 วัตต์',
            '7,457 วัตต์'
        ]
    }
    table7: any = {
        'name': 'หน่วยปริมาตรน้ำต่อเวลา',
        'source': ['1 ลิตร/นาที',
            '1 ลิตร/นาที',
            '1 ลูกบาศก์เมตร/นาที',
            '1 ลูกบาศก์เมตร/นาที',
            '1 ลูกบาศก์เมตร/ชั่วโมง',
            '1 ลูกบาศก์เมตร/ชั่วโมง',
            '1 ลูกบาศก์เมตร/ชั่วโมง',
            '1 ลูกบาศก์เมตร/ชั่วโมง',],
        'dest': ['0.017 ลิตร/ชั่วโมง',
            '0.000017 ลูกบาศก์เมตร/ชั่วโมง',
            '1,000 ลิตร/นาที',
            '60 ลูกบาศก์เมตร/ชั่วโมง',
            '24 ลูกบาศก์เมตร/วัน',
            '168.46 ลูกบาศก์เมตร/สัปดาห์',
            '730 ลูกบาศก์เมตร/เดือน',
            ' 8,760 ลูกบาศก์เมตร/ปี'
        ],
    }
}