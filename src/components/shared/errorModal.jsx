'use client';


import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from '../ui/dialog';


const ErrorModal = ({
  isErrorModalOpen,
  setErrorModalState,
  heading = 'An error occurred.',
  subheading,
  children,
}) => {
  return (
    <Dialog open={isErrorModalOpen} onOpenChange={setErrorModalState}>
      <DialogContent
        aria-label={"Error Modal"}
        style={{
          width: '99.5%',
        }}
        className='!min-h-max sm:!max-w-[520px] max-sm:overflow-y-scroll min-w-[250px] sm:min-w-[300px] md:min-w-[520px]'
      >
        <DialogHeader className="bg-red-100">
          <DialogClose className="ml-auto bg-white text-red-900">
            Close
          </DialogClose>
        </DialogHeader>

        <DialogBody className="p-0 text-center">
          <div className="px-8 pb-6 pt-10">
            <DialogTitle className="font-heading text-xl text-red-900">
              {heading}
            </DialogTitle>
            <DialogDescription className="text-red-400">
              {subheading}
            </DialogDescription>
          </div>

          {children}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorModal;
