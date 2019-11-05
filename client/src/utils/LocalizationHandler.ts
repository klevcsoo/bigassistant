class LocalizationHandler {
  static formatDate(date: number | string | Date) {
    const innerDate = new Date(date);
    const months = [
        'január', 'február', 'március',
        'április', 'május', 'június',
        'július', 'augusztus', 'szeptember',
        'október', 'november', 'december'
    ];
  
    const year = innerDate.getFullYear();
    const month = months[innerDate.getMonth()];
    const day = innerDate.getDate();
  
    return `${year}. ${month} ${day}.`;
  }
}

export default LocalizationHandler;