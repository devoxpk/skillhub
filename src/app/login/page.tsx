'use client';

import { Dialog, DialogContent } from '@/app/components/ui/dialog';
import { LoginForm } from '@/app/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Dialog open={true}>
          <DialogContent className='h-screen w-screen max-w-full p-2  sm:max-w-full top-1/2 left-1/2 rounded-none  bg-accent'>
            <section className='m-auto max-sm:w-full max-w-lg'>
              <LoginForm />
            </section>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}