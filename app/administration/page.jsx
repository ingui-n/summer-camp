// 'use client';

import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
// import {useEffect} from "react";
// import Chart from 'chart.js/auto';

export default async function Page() {
  const logs = await getRegistrationLogs();

  /*useEffect(() => {
    if (typeof logs !== 'object')
      return;

    const today = moment().format('YYYY-MM-DD');
    const oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

    const todayEnd = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    const dateStart = moment().startOf('day').format('YYYY-MM-DD');

    //sum all registrations in range

    // data pro y - dotzay do funkce
    let data = [];
    for (let i = 0; i < logs.length; i++) {
      //TADY DOTAZY NA DATA + ulozeni
      let randomValue = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
      data.push({
        x: moment().subtract(7 - i, 'days').format('YYYY-MM-DD'),
        y: logs.i
      });
    }

    // create chart
    new Chart("chart", {
      type: "line",
      data: {
        datasets: [{
          data: data,
          borderColor: "blue",
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Attendance for Last 7 Days'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
            ticks: {
              min: oneWeekAgo,
              max: today
            }
          }],
        }
        //X AXIS TEORETICKY SE MŮŽE UPRAVI ROUND MIN 0.9 A MAX 1.1
      }
    });
  }, [logs]);*/

  return (
    <>
      <div className="content">
      {/*  todo chart */}
        <canvas id="chart"></canvas>
      </div>
    </>
  );
}

const getRegistrationLogs = async () => {
  const logs = await prisma.logs_registration.findMany();
  return reparseJson(logs);
};
