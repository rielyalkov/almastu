const months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');

export function format_date(date: Date): string {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} года в ${date.getHours()}:${date.getMinutes()}`;
}
