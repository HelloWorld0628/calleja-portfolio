// Contact service - business logic using Prisma
import { prisma } from '../database.js';
import { sendContactEmail } from './email.js';
import { HttpError } from '../utils/httpError.js';

export async function createContactMessage({ name, email, message }) {
  const record = await prisma.contactMessage.create({
    data: { name, email, message },
  });

  // Send email (don't fail if email fails)
  try {
    await sendContactEmail({ name, email, message });
  } catch (error) {
    console.error('Email send failed:', error.message);
  }

  return record;
}

export async function getContactMessages({ page = 1, limit = 20, status } = {}) {
  const skip = (page - 1) * limit;
  const where = status ? { status } : {};

  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.contactMessage.count({ where }),
  ]);

  return {
    messages,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getContactMessage(id) {
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) throw HttpError.notFound('Message not found');
  return message;
}

export async function updateMessageStatus(id, status) {
  const validStatuses = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'];
  if (!validStatuses.includes(status)) {
    throw HttpError.badRequest(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }
  return prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
}

export async function deleteContactMessage(id) {
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) throw HttpError.notFound('Message not found');
  return prisma.contactMessage.delete({ where: { id } });
}

export async function getMessageStats() {
  const [total, newCount, readCount, repliedCount, archivedCount] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: 'NEW' } }),
    prisma.contactMessage.count({ where: { status: 'READ' } }),
    prisma.contactMessage.count({ where: { status: 'REPLIED' } }),
    prisma.contactMessage.count({ where: { status: 'ARCHIVED' } }),
  ]);

  return { total, new: newCount, read: readCount, replied: repliedCount, archived: archivedCount };
}