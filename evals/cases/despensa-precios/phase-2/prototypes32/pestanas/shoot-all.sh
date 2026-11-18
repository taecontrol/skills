#!/usr/bin/env bash
# Renders every scenario (and the steps of each flow) at 390×844 and 1440×900.
cd "$(dirname "$0")"
PROTO=k-pestanas npx vp build --config vite.config.ts >/dev/null 2>&1 || exit 1
while read -r name query; do
  [[ -z $name || $name == \#* ]] && continue
  ./shoot.sh "$name" "$query" &
  while (( $(jobs -r | wc -l) >= 2 )); do wait -n; done
done <<'LIST'
tipos s=tipos
tipos-0-productos s=tipos&tab=productos
tipos-1-selector s=tipos&do=escenarios
tipos-2-desde-productos s=tipos&tab=productos&do=tab-tipos
tipos-3-abrir s=tipos&do=abrir-tipo-knd_8
renombrar s=renombrar
renombrar-2-guardado s=renombrar&do=guardar-tipo
renombrar-3-lista s=renombrar&do=guardar-tipo,cerrar
renombrar-4-producto s=renombrar&do=guardar-tipo,abrir-producto-prd_4
nombre-tomado s=nombre-tomado
nombre-tomado-2-error s=nombre-tomado&do=guardar-tipo
nombre-tomado-3-unir s=nombre-tomado&do=guardar-tipo,unir-con-tomado
unir s=unir
unir-2-elegir s=unir&do=unir-tipo
unir-3-cual-queda s=unir&do=unir-tipo,elegir-tipo-knd_7
unir-4-elegido s=unir&do=unir-tipo,elegir-tipo-knd_7,queda-knd_7
unir-5-resultado s=unir&do=unir-tipo,elegir-tipo-knd_7,queda-knd_7,confirmar-unir-tipo
unir-6-lista s=unir&do=unir-tipo,elegir-tipo-knd_7,queda-knd_7,confirmar-unir-tipo,cerrar
borrar s=borrar
borrar-2-confirmar s=borrar&do=borrar-tipo
borrar-3-borrado s=borrar&do=borrar-tipo,confirmar-borrar-tipo
no-se-puede-borrar s=no-se-puede-borrar
ya-no-existe s=ya-no-existe
ya-no-existe-2-error s=ya-no-existe&do=guardar-tipo
ya-no-existe-3-recupera s=ya-no-existe&do=guardar-tipo,volver-tipos,espera
sin-conexion s=sin-conexion
sin-conexion-2-error s=sin-conexion&do=guardar-tipo
sin-conexion-3-reintento s=sin-conexion&do=guardar-tipo,reintentar
filtro-tipo s=filtro-tipo
filtro-tipo-2-lista s=filtro-tipo&do=filtro-tipo
filtro-tipo-3-sin-tipo s=filtro-tipo&do=filtro-sin-tipo
filtro-tipo-4-vacio s=filtro-tipo&do=filtro-tipo,filtrar-knd_3
filtro-tipo-5-renombrado s=filtro-tipo&do=tab-tipos,abrir-tipo-knd_7,nombre-tipo=Leche%20entera,guardar-tipo,cerrar,tab-productos
filtro-tipo-6-unido s=filtro-tipo&do=tab-tipos,abrir-tipo-knd_7,unir-tipo,elegir-tipo-knd_5,queda-knd_5,confirmar-unir-tipo,cerrar,tab-productos
fila-entera s=fila-entera
fila-entera-2-tipo s=fila-entera&do=celda-knd_1
fila-entera-3-producto s=fila-entera&do=tab-productos,celda-prd_8
atras-1-producto-a-tipo s=renombrar&do=abrir-producto-prd_4,atras
atras-2-tipo-a-lista s=renombrar&do=atras
atras-3-pestana s=tipos&tab=productos&do=tab-tipos,atras
LIST
wait
