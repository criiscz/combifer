"use client"
import styles from './style.module.css'
import {useQuery} from "react-query";
import {ApexOptions} from "apexcharts";
import {useEffect, useState} from "react";
import {getReportBuys, getReportProductMostSold} from "@/api/Reports";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})

export default function ReportPage() {
  return (
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
            <ProductReport/>
          </ReportPanel>
          <ReportPanel title={'Reporte de Finanzas'} description={'Finanzaaas'}>
            <ProductReport/>
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

  const {data} = useQuery('report_products_mopst', async () => {
    return await fetch('http://localhost:8090/reports/most-sold-products?start_date=2020-10-10&end_date=2023-06-10&products_amount=3', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  })

  const series = [
    {
      name: "Most Sold Products",
      data: [44, 55, 41, 67, 22, 43]

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
      formatter: function (val: any) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6'],
    },
    yaxis: {
      title: {
        text: '% (Percentage)'
      }
    }
  } as ApexOptions

  return typeof window !== 'undefined' && data && <Chart options={options} series={series} type={"bar"} width={600}/>
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
      data: data && data.data.map((item: any) => item.productUnitPrice) || []
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
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0])

// refetch data when date changes
  useEffect(() => {
    refetch()
  }, [startDate, endDate, refetch])

  function getDefaultStartDate() {
    const date = new Date()
    date.setMonth(date.getMonth() - 2)
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
        <input type="date" min={startDate} max={new Date().toISOString().split("T")[0]}
               name="end_date" id="end_date" value={endDate}
               onChange={e => setEndDate(e.target.value)}/>
      </div>
      {typeof window !== 'undefined' && data && <Chart options={options} series={series} type={"bar"} width={600}/>}
    </div>
  )
}

interface ReportPanelProps {
  title: string,
  description: string,
  children?: any
}