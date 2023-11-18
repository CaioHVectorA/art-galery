import React, { ElementType, ReactNode } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog'
type DialogProps = {
    title: string,
    cancelLabel: string,
    actionLabel: string | ReactNode,
    handleAction: () => void,
    handleCancel: () => void
    children: ReactNode
    defaultOpen?: boolean,
    onOpen?: (open: boolean) => void,
    open?: boolean,
    Trigger?: ElementType
}
export function Dialog({ actionLabel, cancelLabel, children, title, defaultOpen = false, onOpen, open = false, Trigger, handleAction, handleCancel }: DialogProps) {
    return (
        <>
        
            <AlertDialog open={open} onOpenChange={onOpen} defaultOpen={defaultOpen}>
              {Trigger && <Trigger />}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{title}</AlertDialogTitle>
                  {typeof children === 'string' ?
                    <AlertDialogDescription>
                    {children}
                  </AlertDialogDescription> : <>{children}</>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleCancel}>{cancelLabel}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAction}>{actionLabel}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>  
            </AlertDialog>
        </>
    )
}