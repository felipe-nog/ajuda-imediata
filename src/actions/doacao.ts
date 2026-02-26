'use server'

import { revalidatePath } from 'next/cache'
import { ItemType, RoleType } from '../../generated/prisma/enums'
import { prisma } from '@/lib/prisma'

export async function registrarItem(formData: FormData) {
  const nome = formData.get('nome') as string;
  const telefone = formData.get('telefone') as string;
  const bairro = formData.get('bairro') as string;
  const tipo_publicacao = formData.get('tipo_publicacao') as ItemType;
  const categoria = formData.get('categoria') as string;
  const descricao = formData.get('descricao') as string;
  const pin_seguranca = formData.get('pin_seguranca') as string ;

  try {
    const usuario = await prisma.user.create({
      data: {
        nome,
        telefone,
        bairro,
        tipo: tipo_publicacao === 'OFERTA' ? RoleType.DOADOR : RoleType.RECEPTOR,
      }
    })

    await prisma.item.create({
      data: {
        tipo_publicacao,
        categoria,
        descricao,
        pin_seguranca,
        usuario_id: usuario.id
      }
    })

    revalidatePath('/')
    return { success: true, message: 'Registro salvo com sucesso!' }
  } catch (error) {
    console.error('Erro ao salvar item:', error)
    return { success: false, message: 'Ocorreu um erro ao tentar salvar.' }
  }
}

export async function resolverItem(itemId: string, pinFornecido: string) {
  try {
    const item = await prisma.item.findUnique({ where: { id: itemId } })
    
    if (!item || item.pin_seguranca !== pinFornecido) {
      return { success: false, message: 'PIN incorreto. Tente novamente.' }
    }

    await prisma.item.update({
      where: { id: itemId },
      data: { status: 'CONCLUIDO' }
    })

    revalidatePath('/')
    return { success: true, message: 'Item marcado como resolvido!' }
  } catch (error) {
    return { success: false, message: 'Erro no servidor.' }
  }
}