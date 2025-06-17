import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import PageEditor from '@/components/editor/PageEditor';
import PageAnalytics from '@/components/analytics/PageAnalytics';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
  });

  if (!page) {
    redirect('/dashboard');
  }

  if (page.userId !== session.user.id) {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PageEditor page={page} />
        </div>
        <div>
          <PageAnalytics pageId={page.id} />
        </div>
      </div>
    </div>
  );
} 