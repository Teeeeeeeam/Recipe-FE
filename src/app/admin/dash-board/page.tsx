'use client'
import {
  getAllDayVisit,
  getDailyVisit,
  getMemberCount,
  getMonthlyVisit,
  getPostCount,
  getRecipeCount,
  getTodayVisit,
  getWeeklyVisit,
  getYesterdayVisit,
} from '@/api/admin-apis'

import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
interface NumberOfVisit {
  alldayVisit: number | null
  yesterdayVisit: number | null
  todayVisit: number | null
}

interface VisitData {
  date?: string
  week?: string
  month?: string
  count: number
}
interface DailyVisitData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    pointBorderColor: string
    pointBackgroundColor: string
    pointHoverBackgroundColor: string
    pointHoverBorderColor: string
    pointRadius: number
    pointHoverRadius: number
    pointStyle: string
  }[]
}
interface Counts {
  type: string
  count: number
}
const CHART_INTERVALS = ['일간', '주간', '월간']

const DashBoard = () => {
  const [numberOfVisit, setNumberOfVisit] = useState<NumberOfVisit | null>(null)
  const [visitData, setVisitData] = useState<DailyVisitData>({
    labels: [],
    datasets: [],
  })
  const [counts, setCounts] = useState<Counts[]>([])
  const [interval, setInterval] = useState('일간')

  const fetchBasicVisit = async () => {
    const alldayVisit = await getAllDayVisit()
    const yesterdayVisit = await getYesterdayVisit()
    const todayVisit = await getTodayVisit()
    const visit = { alldayVisit, yesterdayVisit, todayVisit }
    setNumberOfVisit({ ...visit })
  }

  const fetchVisitData = async (interval: string) => {
    let visitData: VisitData[] = []
    if (interval === '일간') {
      visitData = await getDailyVisit(null)
    } else if (interval === '주간') {
      visitData = await getWeeklyVisit()
    } else if (interval === '월간') {
      visitData = await getMonthlyVisit()
    }

    let lastMonth = ''
    const labels = visitData
      .reverse()
      .map((el) => {
        const dateString = el.date || el.week || el.month
        if (dateString) {
          const date = new Date(dateString)
          const month = date.toLocaleString('default', { month: 'short' })
          const day = date.getDate()
          if (month !== lastMonth) {
            lastMonth = month
            return `${month} ${day}`
          }
          return `${day}`
        }
        return ''
      })
      .filter((label) => label !== '')

    const data = visitData.map((el) => el.count)

    setVisitData({
      labels,
      datasets: [
        {
          label: `${interval} 방문수`,
          data,
          borderColor: '#3B8AC4',
          backgroundColor: '#fff',
          pointBorderColor: '#3B8AC4',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: '#3B8AC4',
          pointHoverBorderColor: '#000',
          pointRadius: 4,
          pointHoverRadius: 4,
          pointStyle: 'circle',
        },
      ],
    })
  }

  const fetchCounts = async () => {
    const recipesCount = await getRecipeCount()
    const postsCount = await getPostCount()
    const membersCount = await getMemberCount()

    setCounts([
      { type: '레시피 수', count: recipesCount },
      { type: '유저 게시글 수', count: postsCount },
      { type: '유저 수', count: membersCount },
    ])
  }

  useEffect(() => {
    fetchBasicVisit()
    fetchVisitData(interval)
    fetchCounts()
  }, [interval])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          color: '#E3E3E3',
        },
        ticks: {
          minTicksLimit: 4,
          maxTicksLimit: 8,
          display: false,
        },
      },
    },
  }

  return (
    <div className="md:p-4 bg-gray-100 ">
      <h1 className="text-xl font-semibold mb-2">대시보드</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {counts.map((el, idx) => (
          <div
            key={idx}
            className="flex flex-col py-3 px-4 gap-y-4 items-center bg-white rounded-lg shadow-md text-xl"
          >
            <div>{el.type}</div>
            <div>{el.count}</div>
          </div>
        ))}
      </section>
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="text-lg font-semibold">오늘 방문수</div>
            <div className="text-2xl">{numberOfVisit?.todayVisit}</div>
          </div>
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="text-lg font-semibold">전일 방문수</div>
            <div className="text-2xl">{numberOfVisit?.yesterdayVisit}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">누적 방문수</div>
            <div className="text-2xl">
              {numberOfVisit?.alldayVisit?.toLocaleString()}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-right mb-4">
          {CHART_INTERVALS.map((el, idx) => (
            <button
              key={idx}
              className={`border px-3 py-1 rounded-lg mx-1 transition ${el === interval && 'bg-blue-100 text-white'}`}
              onClick={() => {
                setInterval(el)
              }}
            >
              {el}
            </button>
          ))}
        </div>
        {visitData.labels.length > 0 && (
          <div className="relative w-full h-80">
            <Line options={options} data={visitData} />
          </div>
        )}
      </section>
    </div>
  )
}

export default DashBoard
