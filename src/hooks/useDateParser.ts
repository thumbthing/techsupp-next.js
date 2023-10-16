import { useEffect, useState } from 'react';

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

function useDateParser(date: string) {
  const [parsedDate, setParsedDate] = useState<string>('');

  useEffect(() => {
    if (date !== '') {
      const isoDate = new Date(date);

      const formatedDate = new Intl.DateTimeFormat('ko-KR', options).format(isoDate);
      setParsedDate(formatedDate);
    }
  }, [date]);

  return parsedDate;
}

export default useDateParser;
