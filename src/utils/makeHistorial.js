export async function fetchHistorial(datos, metodo) {
  const data = await fetch('/api/generarHistorial', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ datos, metodo }),
  });
  if (!data.ok) {
    return;
  }
  const res = await data.json();
  const { message } = res;
  return res;
}

export async function fetchHistorialPresupuesto(datos, metodo) {
  const data = await fetch('/api/generarHistorialPresupuesto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ datos, metodo }),
  });
  if (!data.ok) {
    return;
  }
  const res = await data.json();
  return res;
}

export async function fetchHistorialInventario(datos, metodo) {
  const data = await fetch('/api/generarHistorialPresupuesto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ datos, metodo }),
  });
  if (!data.ok) {
    return;
  }
  const res = await data.json();
  return res;
}

export async function getHistorial() {
  const data = await fetch(`${process.env.URL_LOCAL}/api/generarHistorial`);
  if (!data.ok) {
    return;
  }
  const res = await data.json();
  return res;
}
