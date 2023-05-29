"use client"
import styles from './style.module.css'
import {useQuery} from "react-query";
import {ApexOptions} from "apexcharts";
import {useEffect, useState} from "react";
import {getFinanceReport, getReportBuys, getReportProductMostSold, getReportSales} from "@/api/Reports";
import dynamic from "next/dynamic";
import {useLoginStatus} from "@/hooks/useLoginStatus";

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})

export default function ReportPage() {
  const {isAdmin} = useLoginStatus()
  return isAdmin && (
    <div className={styles.container}>
      <div className={styles.reports}>
        <h1 className={styles.reports__title}>Reportes</h1>
        <div className={styles.reports__body}>
          <ReportPanel title={'Reporte de Productos'} description={'Productooos'}>
            <ProductReport/>
          </ReportPanel>
          <ReportPanel title={'Reporte de Compras'} description={'Compraaas'}>
            <BuyReport/>
          </ReportPanel>
          <ReportPanel title={'Reporte de Ventas'} description={'Ventaaas'}>
            <SellReport/>
          </ReportPanel>
          <ReportPanel title={'Reporte de Finanzas'} description={'Finanzaaas'}>
            <FinanceReport/>
          </ReportPanel>
        </div>
      </div>
    </div>
  )
}

const ReportPanel = (props: ReportPanelProps) => {
  return (
    <div className={styles.reports__body_item}>
      <h2 className={styles.reports__body_item_title}>{props.title}</h2>
      <section className={styles.reports__body_item_graph}>
        {props.children}
      </section>
      <p className={styles.reports__body_item_description}>{props.description}</p>
    </div>
  )
}

const ProductReport = () => {

  const {data} = useQuery('report_products_most', async () => {
    return await getReportProductMostSold('2022-02-02', '2023-06-06', 10)
      .then(res => res.data).then(res => {
        const data = res.map((item: any) => {
          return {
            name: item.product.name,
            data: item.soldAmount
          }
        })
        return {
          data: data
        }
      })
  })

  const series = [
    {
      name: "Most Sold Products",
      data: data && data.data.map((item: any) => item.data)
    }
  ]
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: data && data.data.map((item: any) => item.name) || [],
    },
    yaxis: {
      title: {
        text: '% (Percentage)'
      }
    }
  } as ApexOptions

  return typeof window !== 'undefined' && data &&
      <Chart options={options} series={series} type={"bar"} width={600}/> || null
}
const BuyReport = () => {

  const {data, refetch} = useQuery('report-buy-products', async () => {
    return await getReportBuys(startDate, endDate).then(res => res.data).then(res => {
      const data = res.reduce((acc: any, item: any) => {
        const found = acc.find((i: any) => i.productName === item.productName)
        if (found) {
          found.productQuantity += item.productQuantity
          found.productUnitPrice += item.productUnitPrice * item.productQuantity
        } else {
          acc.push(item)
        }
        return acc
      }, [])
      return {data}
    })
  })
  //
  const series = [
    {
      name: "Cantidad de productos comprados",
      type: 'column',
      data: data && data.data.map((item: any) => item.productQuantity) || []
    }, {
      name: "Precio total de productos comprados",
      type: 'line',
      data: data && data.data.map((item: any) => item.productUnitPrice * item.productQuantity) || []
    }
  ]

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        }
      }
    },
    fill: {
      type: 'solid',
      colors: [
        '#eb4d4b',
        '#6ab04c'],
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        }
      }
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth',
      colors: ['#4ba8eb'],
      fill: {
        type: 'solid',
        colors: [
          '#eb4d4b',
          '#6ab04c'],
      },

    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      style: {
        fontSize: '12px',
        colors: ["#eb4b4b", "#4ba8eb"]
      },
      background: {
        enabled: true,
      },
    },
    xaxis: {
      // categories: data && data.data.map((item: any) => item.productName) || [],
      title: {
        text: 'Productos'
      },
      categories: data && data.data.map((item: any) => item.productName) || [],
    },
    yaxis: [
      {
        title: {
          text: 'Cantidad de productos comprados',
          style: {
            color: '#eb4b4b',
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Precio total de productos comprados',
          style: {
            color: '#4ba8eb',
          }
        }
      }
    ],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 10,
      labels: {
        colors: ['#eb4b4b', '#4ba8eb'],
      },
      markers: {
        fillColors: ['#eb4b4b', '#4ba8eb'],
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      marker: {
        fillColors: ['#eb4b4b', '#4ba8eb'],
      }
    },
  } as ApexOptions

  const [startDate, setStartDate] = useState(getDefaultStartDate())
  const [endDate, setEndDate] = useState(getDefaultEndDate())

// refetch data when date changes
  useEffect(() => {
    refetch()
  }, [startDate, endDate, refetch])

  function getDefaultStartDate() {
    const date = new Date()
    date.setMonth(date.getMonth() - 2)
    return date.toISOString().split("T")[0]
  }

  function getDefaultEndDate() {
    const date = new Date()
    date.setHours(date.getHours() + 24)
    return date.toISOString().split("T")[0]
  }

  return (
    <div>
      <div className={styles.reports__body_item_date}>
        <label htmlFor="start_date">Fecha de inicio</label>
        <input type="date" min="2022-01-01" max={endDate} name="start_date" id="start_date"
               value={startDate}
               onChange={e => setStartDate(e.target.value)}/>
        <label htmlFor="end_date">Fecha de fin</label>
        <input type="date" min={startDate} max={getDefaultEndDate()}
               name="end_date" id="end_date" value={endDate}
               onChange={e => setEndDate(e.target.value)}/>
      </div>
      {typeof window !== 'undefined' && data &&
          <Chart options={options} series={series} type={"bar"} width={600}/>}
    </div>
  )
}

const SellReport = () => {

  const [startDate, setStartDate] = useState(getDefaultStartDate())
  const [endDate, setEndDate] = useState(getDefaultEndDate())

  function getDefaultStartDate() {
    const date = new Date()
    date.setMonth(date.getMonth() - 2)
    return date.toISOString().split("T")[0]
  }

  function getDefaultEndDate() {
    const date = new Date()
    date.setHours(date.getHours() + 24)
    return date.toISOString().split("T")[0]
  }

  const {data, refetch} = useQuery('report-sell-products', async () => {
    return await getReportSales(startDate, endDate).then(res => res.data).then(res => {
      const groupedData: {[key: string]: {productQuantity: number, productTotalPrice: number, products: any[]}} = res.reduce((groups: {[key: string]: {productQuantity: number, productTotalPrice: number, products: any[]}}, item: any) => {
        const soldDate = new Date(item.soldDate);
        const year = soldDate.getFullYear();
        const month = soldDate.getMonth() + 1; // Month is zero-based, so add 1
        const key = `${year}-${month}`;

        if (!groups[key]) {
          groups[key] = {
            productQuantity: 0,
            productTotalPrice: 0,
            products: []
          };
        }

        groups[key].productQuantity += item.product.productQuantity;
        groups[key].productTotalPrice += item.product.productQuantity * item.product.productUnitPrice;
        groups[key].products.push(item.soldDate);

        return groups;
      }, {});
      console.log(groupedData )
      return {data: groupedData}
    })
  })


  // refetch data when date changes
  useEffect(() => {
    refetch()
  }, [startDate, endDate, refetch])

  const sortedData: {[key: string]: {productQuantity: number, productTotalPrice: number, products: any[]}} = Object.entries(data?.data || [])
    .sort(([dateA], [dateB]) => {
      const date1 = new Date(dateA);
      const date2 = new Date(dateB);
      return date1.getTime() - date2.getTime();
    })
    .reduce((sortedObj: {[key: string]: {productQuantity: number, productTotalPrice: number, products: any[]}}, [key, value]) => {
      sortedObj[key] = value;
      return sortedObj;
    }, {});

  const series = [
    {
      name: "Cantidad de productos vendidos",
      data: Object.values(sortedData).map((item: any) => item.productQuantity),
    },
    {
      name: "Precio total de productos vendidos",
      data: Object.values(sortedData).map((item: any) => item.productTotalPrice),
    },
  ];
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    fill: {
      type: 'solid',
      colors: [
        '#eb4d4b',
        '#4ba8eb'],
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth',
      colors: ['#4ba8eb'],
      fill: {
        type: 'solid',
        colors: [
          '#eb4d4b',
          '#4ba8eb'],
      },

    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [0, 1],
      style: {
        fontSize: '12px',
        colors: ["#eb4b4b", "#4ba8eb"]
      },
      background: {
        enabled: true,
      },
    },
    xaxis: {
      categories: Object.keys(sortedData),
      labels: {
        show: true,
      },
    },
    yaxis: [
      {
        title: {
          text: 'Cantidad de productos vendidos',
          style: {
            color: '#eb4b4b',
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Precio total de productos vendidos',
          style: {
            color: '#4ba8eb',

          }
        }
      }
    ],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 10,
      labels: {
        colors: ['#eb4b4b', '#4ba8eb'],
      },
      markers: {
        fillColors: ['#eb4b4b', '#4ba8eb'],
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      marker: {
        fillColors: ['#eb4b4b', '#4ba8eb'],
      }
    },
  } as ApexOptions

  return (
    <div>
      <div className={styles.reports__body_item_date}>
        <label htmlFor="start_date">Fecha de inicio</label>
        <input type="date" min="2022-01-01" max={endDate} name="start_date" id="start_date"
               value={startDate}
               onChange={e => setStartDate(e.target.value)}/>
        <label htmlFor="end_date">Fecha de fin</label>
        <input type="date" min={startDate} max={getDefaultEndDate()}
               name="end_date" id="end_date" value={endDate}
               onChange={e => setEndDate(e.target.value)}/>
      </div>
      {typeof window !== 'undefined' && data &&
          <Chart options={options} series={series} type={"bar"} width={600}/>}
    </div>
  )
}

const FinanceReport = () => {
  const [startDate, setStartDate] = useState(getDefaultStartDate())
  const [endDate, setEndDate] = useState(getDefaultEndDate())

  function getDefaultStartDate() {
    const date = new Date()
    date.setMonth(date.getMonth() - 2)
    return date.toISOString().split("T")[0]
  }

  function getDefaultEndDate() {
    const date = new Date()
    date.setHours(date.getHours() + 24)
    return date.toISOString().split("T")[0]
  }

  const { data, refetch } = useQuery('report-finance', async () => {
    return await getFinanceReport(startDate, endDate).then(res => {
      // Limit decimal places for income and outcome data
      res.incomes = limitDecimalPlaces(res.incomes, 0);
      res.outcomes = limitDecimalPlaces(res.outcomes, 0);

      console.log('res', res)
      return res;
    });
  });

// Function to limit decimal places for an object
  function limitDecimalPlaces(obj:any, decimalPlaces:any) {
    for (const key in obj) {
      if (typeof obj[key] === 'number') {
        obj[key] = obj[key].toFixed(decimalPlaces);
      }
    }
    return obj;
  }

  useEffect(() => {
    refetch()
  }, [startDate, endDate, refetch])


  const series = [
    Number(data?.incomes.monthly) || 0,
    Number(data?.outcomes.monthly) || 0
  ] as ApexOptions['series'];

  const options = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: ['Incomes', 'Outcomes'],
    legend: {
      position: 'bottom',
    },
  } as ApexOptions

  return (
    <div>
      <div className={styles.reports__body_item_date}>
        <label htmlFor="start_date">Fecha de inicio</label>
        <input type="date" min="2022-01-01" max={endDate} name="start_date" id="start_date"
               value={startDate}
               onChange={e => setStartDate(e.target.value)}/>
        <label htmlFor="end_date">Fecha de fin</label>
        <input type="date" min={startDate} max={getDefaultEndDate()}
               name="end_date" id="end_date" value={endDate}
               onChange={e => setEndDate(e.target.value)}/>
      </div>
      {typeof window !== 'undefined' && data &&
          <Chart options={options} series={series} type={"pie"} width={600}/>}
    </div>
  )

}

interface ReportPanelProps {
  title: string,
  description: string,
  children?: any
}