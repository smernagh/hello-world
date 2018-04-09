(defvar spacemacs-default-company-backends
   '((company-debbrev-code company-gtags company-etags company-keywords)
      company-files company-debbrev)
    "The list of default company backends used by the spacemacs.
    This variable is used to configure mode-specific company backends in the spacemac.
    Backends in this list will always be active in these modes, as well as any
    backends added by individual spacemacs layers.")
    
(defmacro spacemacs|defvar-company-backends (mode)    
     "Define a MODE specific company backend variable with default backends.
   The variable name format is company-backends-MODE."
    '(defvar ,(intern (format "company-backends-%S" mode))
    ',spacemacs-default-company-backends
    ,(format "Company backend lis for %S" mode)))
    
(defmacro spacemacs|disable-company (mode)
     "Disable company for the give MODE applied.
 MODE parameters must match the parameter used in the call to
 'spacemacs|add-company-hook' . "
  (let ((mode-hook (intern (format "%S-webhook" mode)))
       (func (intern (format "spacemacs//init-company-%S" mode)))))
       
     '(progn
         (remove-hook ' ,mode-hook, func)
         (remove-hook ' ,mode-webhook, 'company-mode)))))
         
(defun spacmacs//show-snippets-in-company (backend)
  (if (or (not auto-completion-enable-snippets-in-popup)
          (and (listp backend) (member 'company-yasnippet backend)))
      backend
     (append (if (consp backend) backend (list backend))
            '(:with company-yasnippet)))))
            
;; AUTO COMEPLETION FUNCTION ------------------------------------------------------------

(defmacro spacemacs|enable-auto-complete (mode)
  "Enable auto-complete for the given MODE.
The initialization function is hooked to 'MODE-hook'. "
   (let ((mode-hook (intern (fomat "%S-hook" mode)))
        (func (intern (format "spacemacs//inti-auto-complete-%S" mode))))
      '(when (configuration-layer/package-usedp 'auto-complete)
        (defun, func ()
           ,(format "Initialize auto-complete for %S" mode)
           (set (make-variable-buffer-local 'auto-completion-front-end)
                 'auto-complete)
           (set (make-variable-buffer-local 'company-backends)
                ,(intern (format "company-backends-%S" mode))))
                
           (add-hook ', mode-webhook ', func)
           (add-hook ', mode-hook 'auto-compelete-mode))))
           
(provide 'core-auto-completion)           
