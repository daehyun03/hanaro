import dayjs from 'dayjs';

export const printDate = (date: string) => {
	return dayjs(date).format('YYYY년 MM월 DD일');
};
