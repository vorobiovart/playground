import moment from 'moment';
import _ from 'lodash';


// !!!! dateFormat is -> MM-DD-YYYY

const workTimePeacesNotSorted = [{
  startDate: '01-01-2015',
  endDate: '02-01-2016'
}, {
  startDate: '05-01-2015',
  endDate: '05-01-2016'
}, {
  startDate: '12-01-2015',
  endDate: '01-01-2016'
}, {
  startDate: '08-01-2016',
  endDate: '07-01-2017'
}, {
  startDate: '06-01-2016',
  endDate: '07-01-2017'
}];

function sortPeriods(workTimePeaces) {
  workTimePeaces.sort(function compare(a, b) {
    var dateA = new Date(a.startDate);
    var dateB = new Date(b.startDate);
    return dateA - dateB;
  });

  return workTimePeaces;
}

function findClaimedMonths(workTimePeaces) {
  let firstLastDates = {
    firstDate: null,
    lastDate: null
  };

  workTimePeaces.forEach((workObj, index) => {
    if (index === 0) {
      firstLastDates.firstDate = workObj.startDate;
      firstLastDates.lastDate = workObj.endDate;
    } else {
      if (moment(workObj.startDate) < moment(firstLastDates.firstDate)) {
        firstLastDates.firstDate = workObj.startDate;
      }

      if (moment(workObj.endDate) > moment(firstLastDates.firstDate)) {
        firstLastDates.lastDate = workObj.endDate;
      }
    }
  });

  return moment(firstLastDates.lastDate).diff(moment(firstLastDates.firstDate), 'months', true);
}

function findGapsInMonths(workTimePeaces) {
  const sortedPeriods = sortPeriods(workTimePeaces);
  let gaps = [];
  let currentPeriod = {};
  let monthsOfGaps = 0;

  sortedPeriods.forEach((workObj, index) => {
    if (index === 0) {
      currentPeriod.firstDate =workObj.startDate;
      currentPeriod.lastDate = workObj.endDate;
    } else {
      if (moment(workObj.startDate).isBetween(moment(currentPeriod.firstDate), moment(currentPeriod.lastDate))) {
        if (moment(workObj.endDate) > currentPeriod.lastDate) {
          currentPeriod.lastDate = workObj.endDate;
        }
      } else {
        gaps.push({
          startDate: currentPeriod.lastDate,
          endDate: workObj.startDate
        });
        currentPeriod.firstDate = workObj.startDate;
        currentPeriod.lastDate = workObj.endDate;
      }
    }
  });

  gaps.forEach(gap => {
    monthsOfGaps += moment(gap.endDate).diff(moment(gap.startDate), 'months', true);
  });

  return monthsOfGaps;
}

function getWorkExperince() {
  const claimedMonths = findClaimedMonths(workTimePeacesNotSorted);
  const monthsOfGaps = findGapsInMonths(workTimePeacesNotSorted);
  const realWorkingExp = claimedMonths - monthsOfGaps;

  console.log(realWorkingExp);
}

export default {
  getWorkExperince
}
