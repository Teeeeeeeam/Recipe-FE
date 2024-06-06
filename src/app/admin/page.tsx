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

const Admin = () => {
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

    const data = visitData.map((el) => el.count).reverse()

    setVisitData({
      labels,
      datasets: [
        {
          label: `${interval} 방문수`,
          data,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
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
    <div className="p-4">
      <section className="grid grid-cols-3 gap-x-2 py-2">
        {counts.map((el, idx) => (
          <div
            key={idx}
            className="flex flex-col py-4 gap-y-4 items-center bg-green-150 text-white text-xl"
          >
            <div>{el.type}</div>
            <div>{el.count}</div>
          </div>
        ))}
      </section>
      <section className="flex items-center px-4 py-4 border">
        <div className="flex gap-x-4">
          <div className="flex flex-col">
            <div>오늘 방문수</div>
            <div>{numberOfVisit?.todayVisit}</div>
          </div>
          <div>
            <div>전일 방문수</div>
            <div>{numberOfVisit?.yesterdayVisit}</div>
          </div>
          <div>
            <div>누적 방문수</div>
            <div>{numberOfVisit?.alldayVisit?.toLocaleString()}</div>
          </div>
        </div>
      </section>

      <section className="w-full overflow-x-auto">
        <div className="text-right my-2">
          {CHART_INTERVALS.map((el, idx) => (
            <button
              key={idx}
              className={`border px-2 py-1 ${el === interval && 'bg-green-150 text-white'}`}
              onClick={() => {
                setInterval(el)
              }}
            >
              {el}
            </button>
          ))}
        </div>
        {visitData.labels.length > 0 && (
          <div className="relative w-full h-[320px]">
            <Line options={options} data={visitData} />
          </div>
        )}
      </section>
    </div>
  )
}

export default Admin
