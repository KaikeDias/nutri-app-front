import { useQuasar } from "quasar";

export default function useNotify() {
    const $q = useQuasar()

    const notifySuccess = (message: string) => {
        $q.notify({
            type: 'positive',
            message: message || 'Ação concluida!'
        })
    }
    
    const notifyError = (message: string) => {
        $q.notify({
            type: 'negative',
            message: message || 'Ocorreu um erro inesperado!'
        })
    }

    return {
        notifySuccess,
        notifyError
    }
}