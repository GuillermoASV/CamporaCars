'use client';

import { Bar, BarChart, Cell, XAxis, YAxis } from 'recharts';
import React from 'react';
import { AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { JetBrains_Mono } from 'next/font/google';
import { useSpring } from 'framer-motion';

const infoTareaStyle = 'text-muted-foreground overflow-x-auto text-sm';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const CHART_MARGIN = 35;

const chartConfig = {
  total: {
    label: 'Total',
    color: 'var(--secondary-foreground)',
  },
};

function isFloat(x) {
  return !!(x % 1);
}

export function ValueLineBarChart({ datosProducto }) {
  const datosFuncionales = datosProducto.materiales.length >= 1;
  if (!datosFuncionales) {
    return <h1>No hay datos disponibles</h1>;
  }
  const MAPDEDATOSMATERIALES = (datos) => {
    const { materiales, cantidades, gastos } = datos;
    return materiales.map((material, index) => ({
      material,
      cantidad: cantidades[index],
      gasto: gastos[index],
      total: gastos[index] * cantidades[index],
    }));
  };

  const chartData = MAPDEDATOSMATERIALES(datosProducto);
  const totalGanado = (data) => {
    return data.reduce((acc, item) => acc + item.total, 0);
  };
  const resultado = datosProducto.presupuesto - totalGanado(chartData).toFixed(2);

  const totalMateriales = (data) => {
    return data.reduce((acc, item) => acc + item.cantidad, 0);
  };
  const [activeIndex, setActiveIndex] = React.useState(undefined);

  const maxValueIndex = React.useMemo(() => {
    if (activeIndex !== undefined) {
      return { index: activeIndex, value: chartData[activeIndex].total };
    }
    return chartData.reduce(
      (max, data, index) => (data.total > max.value ? { index, value: data.total } : max),
      { index: 0, value: 0 },
    );
  }, [activeIndex, chartData]);

  const maxValueIndexSpring = useSpring(maxValueIndex.value, {
    stiffness: 100,
    damping: 20,
  });

  React.useEffect(() => {
    maxValueIndexSpring.set(maxValueIndex.value);
  }, [maxValueIndex.value, maxValueIndexSpring]);

  const costoUnidad = chartData[maxValueIndex.index]?.gasto ?? 0;
  const material = chartData[maxValueIndex.index]?.material ?? 0;
  const cantidad = chartData[maxValueIndex.index]?.cantidad ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-1">
          <div className="items-center gap-2">
            <span
              className={cn(jetBrainsMono.className, 'flex max-w-[26rem] text-xl tracking-tighter')}
            >
              {datosProducto.presupuesto > 0 ? (
                <div>
                  <span className="flex max-h-[2rem] min-h-[1.7rem] max-w-[412px] text-sm tracking-tighter text-gray-800">
                    (Presupuesto) - (Gasto/s) = Ganacia/Perdida
                  </span>
                  <span className="flex max-w-[26rem] overflow-x-auto">
                    <p className="text-green-500/90"> {datosProducto.presupuesto}$</p>{' '}
                    <p className="mx-2">-</p>
                    <p className="text-red-500">
                      {' '}
                      {isFloat(totalGanado(chartData))
                        ? totalGanado(chartData).toFixed(2)
                        : totalGanado(chartData)}
                      $
                    </p>
                    <p className="mx-2">=</p>
                    <p className={`${resultado < 0 ? 'text-red-500' : 'text-green-500/90'} block`}>
                      {resultado}$
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  <span className="flex max-h-[2rem] min-h-[1.7rem] max-w-[412px] text-sm tracking-tighter text-gray-800">
                    (Gasto/s)
                  </span>
                  <p className="text-red-500">
                    -
                    {isFloat(totalGanado(chartData))
                      ? totalGanado(chartData).toFixed(2)
                      : totalGanado(chartData)}
                    ${' '}
                  </p>
                </div>
              )}
            </span>
          </div>
        </CardTitle>
        <CardDescription>Distribucion de costos por material</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              onMouseLeave={() => setActiveIndex(undefined)}
              margin={{
                left: CHART_MARGIN,
              }}
            >
              <XAxis
                dataKey="material"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />

              <YAxis hide domain={[0, (dataMax) => dataMax * 1.4]} />

              <Bar dataKey="total" fill="var(--color-desktop)" radius={4} maxBarSize={60}>
                {chartData.map((_, index) => (
                  <Cell
                    className="duration-200"
                    opacity={index === maxValueIndex.index ? 1 : 0.2}
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </AnimatePresence>
        <div className="flex flex-col items-center justify-center">
          <Badge variant="secondary" className={'mt-6 w-[270px] gap-2 bg-gray-200 text-black'}>
            <span className="truncate">
              Gasto total en {material}: {maxValueIndex.value}$
            </span>
          </Badge>
          <div className="flex max-w-[25.8rem] items-center justify-center gap-4 text-left">
            <span className={`${infoTareaStyle} max-w-[10rem]`}>
              Material seleccionado: {material}{' '}
            </span>
            <div className="mt-4 mb-4 flex gap-4">
              <span className={`${infoTareaStyle}`}>Costo por unidad: {costoUnidad}$</span>
              <span className={`${infoTareaStyle}`}>Cantidad utilizada: {cantidad}</span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={'mt-6 w-full gap-2 overflow-x-auto bg-gray-200/80 text-black'}
          >
            <span>Total de materiales utilizados: {totalMateriales(chartData)}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
