require 'yaml'

dir = File.dirname(File.expand_path(__FILE__))

configValues = YAML.load_file("#{dir}/puphpet/config.yaml")
data         = configValues['vagrantfile-local']

Vagrant.require_version '>= 1.6.0'

Vagrant.configure('2') do |config|
  config.vm.box     = "#{data['vm']['box']}"
  config.vm.box_url = "#{data['vm']['box_url']}"

  if data['vm']['hostname'].to_s.strip.length != 0
    config.vm.hostname = "#{data['vm']['hostname']}"
  end

  if data['vm']['network']['private_network'].to_s != ''
    config.vm.network 'private_network', ip: "#{data['vm']['network']['private_network']}"
  end

  data['vm']['network']['forwarded_port'].each do |i, port|
    if port['guest'] != '' && port['host'] != ''
      config.vm.network :forwarded_port, guest: port['guest'].to_i, host: port['host'].to_i
    end
  end

  if !data['vm']['post_up_message'].nil?
    config.vm.post_up_message = "#{data['vm']['post_up_message']}"
  end

  if Vagrant.has_plugin?('vagrant-hostmanager')
    hosts = Array.new()

    if !configValues['apache']['install'].nil? &&
        configValues['apache']['install'].to_i == 1 &&
        configValues['apache']['vhosts'].is_a?(Hash)
      configValues['apache']['vhosts'].each do |i, vhost|
        hosts.push(vhost['servername'])

        if vhost['serveraliases'].is_a?(Array)
          vhost['serveraliases'].each do |vhost_alias|
            hosts.push(vhost_alias)
          end
        end
      end
    elsif !configValues['nginx']['install'].nil? &&
           configValues['nginx']['install'].to_i == 1 &&
           configValues['nginx']['vhosts'].is_a?(Hash)
      configValues['nginx']['vhosts'].each do |i, vhost|
        hosts.push(vhost['server_name'])

        if vhost['server_aliases'].is_a?(Array)
          vhost['server_aliases'].each do |x, vhost_alias|
            hosts.push(vhost_alias)
          end
        end
      end
    end

    if hosts.any?
      if config.vm.hostname.to_s.strip.length == 0
        config.vm.hostname = 'puphpet-dev-machine'
      end

      config.hostmanager.enabled           = true
      config.hostmanager.manage_host       = true
      config.hostmanager.ignore_private_ip = false
      config.hostmanager.include_offline   = false
      config.hostmanager.aliases           = hosts
    end
  end

  if Vagrant.has_plugin?('vagrant-cachier')
    config.cache.scope = :box
  end

  data['vm']['synced_folder'].each do |i, folder|
    if folder['source'] != '' && folder['target'] != ''
      sync_owner = !folder['sync_owner'].nil? ? folder['sync_owner'] : 'www-data'
      sync_group = !folder['sync_group'].nil? ? folder['sync_group'] : 'www-data'

      if folder['sync_type'] == 'nfs'
        config.vm.synced_folder "#{folder['source']}", "#{folder['target']}", id: "#{i}", type: 'nfs'
        if Vagrant.has_plugin?('vagrant-bindfs')
          config.bindfs.bind_folder "#{folder['target']}", "/mnt/vagrant-#{i}"
        end
      elsif folder['sync_type'] == 'smb'
        config.vm.synced_folder "#{folder['source']}", "#{folder['target']}", id: "#{i}", type: 'smb'
      elsif folder['sync_type'] == 'rsync'
        rsync_args = !folder['rsync']['args'].nil? ? folder['rsync']['args'] : ['--verbose', '--archive', '-z']
        rsync_auto = !folder['rsync']['auto'].nil? ? folder['rsync']['auto'] : true
        rsync_exclude = !folder['rsync']['exclude'].nil? ? folder['rsync']['exclude'] : ['.vagrant/']

        config.vm.synced_folder "#{folder['source']}", "#{folder['target']}", id: "#{i}",
          rsync__args: rsync_args, rsync__exclude: rsync_exclude, rsync__auto: rsync_auto, type: 'rsync', group: sync_group, owner: sync_owner
      elsif data['vm']['chosen_provider'] == 'parallels'
        config.vm.synced_folder "#{folder['source']}", "#{folder['target']}", id: "#{i}",
          group: sync_group, owner: sync_owner, mount_options: ['share']
      else
        config.vm.synced_folder "#{folder['source']}", "#{folder['target']}", id: "#{i}",
          group: sync_group, owner: sync_owner, mount_options: ['dmode=775', 'fmode=764']
      end
    end
  end

  config.vm.usable_port_range = (data['vm']['usable_port_range']['start'].to_i..data['vm']['usable_port_range']['stop'].to_i)

  if data['vm']['chosen_provider'].empty? || data['vm']['chosen_provider'] == 'virtualbox'
    ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

    config.vm.provider :virtualbox do |virtualbox|
      data['vm']['provider']['virtualbox']['modifyvm'].each do |key, value|
        if key == 'memory'
          next
        end
        if key == 'cpus'
          next
        end

        if key == 'natdnshostresolver1'
          value = value ? 'on' : 'off'
        end

        virtualbox.customize ['modifyvm', :id, "--#{key}", "#{value}"]
      end

      virtualbox.customize ['modifyvm', :id, '--memory', "#{data['vm']['memory']}"]
      virtualbox.customize ['modifyvm', :id, '--cpus', "#{data['vm']['cpus']}"]

      if data['vm']['provider']['virtualbox']['modifyvm']['name'].nil? ||
        data['vm']['provider']['virtualbox']['modifyvm']['name'].empty?
        if data['vm']['hostname'].to_s.strip.length != 0
          virtualbox.customize ['modifyvm', :id, '--name', config.vm.hostname]
        end
      end
    end
  end

  if data['vm']['chosen_provider'] == 'vmware_fusion' || data['vm']['chosen_provider'] == 'vmware_workstation'
    ENV['VAGRANT_DEFAULT_PROVIDER'] = (data['vm']['chosen_provider'] == 'vmware_fusion') ? 'vmware_fusion' : 'vmware_workstation'

    config.vm.provider :vmware_fusion do |v, override|
      data['vm']['provider']['vmware'].each do |key, value|
        if key == 'memsize'
          next
        end
        if key == 'cpus'
          next
        end

        v.vmx["#{key}"] = "#{value}"
      end

      v.vmx['memsize']  = "#{data['vm']['memory']}"
      v.vmx['numvcpus'] = "#{data['vm']['cpus']}"

      if data['vm']['provider']['vmware']['displayName'].nil? ||
        data['vm']['provider']['vmware']['displayName'].empty?
        if data['vm']['hostname'].to_s.strip.length != 0
          v.vmx['displayName'] = config.vm.hostname
        end
      end
    end
  end

  if data['vm']['chosen_provider'] == 'parallels'
    ENV['VAGRANT_DEFAULT_PROVIDER'] = 'parallels'

    config.vm.provider 'parallels' do |v|
      data['vm']['provider']['parallels'].each do |key, value|
        if key == 'memsize'
          next
        end
        if key == 'cpus'
          next
        end

        v.customize ['set', :id, "--#{key}", "#{value}"]
      end

      v.memory = "#{data['vm']['memory']}"
      v.cpus   = "#{data['vm']['cpus']}"

      if data['vm']['provider']['parallels']['name'].nil? ||
        data['vm']['provider']['parallels']['name'].empty?
        if data['vm']['hostname'].to_s.strip.length != 0
          v.name = config.vm.hostname
        end
      end
    end
  end

  ssh_username = !data['ssh']['username'].nil? ? data['ssh']['username'] : 'vagrant'

  config.vm.provision 'shell' do |s|
    s.path = 'puphpet/shell/initial-setup.sh'
    s.args = '/vagrant/puphpet'
  end
  config.vm.provision 'shell' do |kg|
    kg.path = 'puphpet/shell/ssh-keygen.sh'
    kg.args = "#{ssh_username}"
  end
  config.vm.provision :shell, :path => 'puphpet/shell/install-ruby.sh'
  config.vm.provision :shell, :path => 'puphpet/shell/install-puppet.sh'

  config.vm.provision :puppet do |puppet|
    puppet.facter = {
      'ssh_username'     => "#{ssh_username}",
      'provisioner_type' => ENV['VAGRANT_DEFAULT_PROVIDER'],
      'vm_target_key'    => 'vagrantfile-local',
    }
    puppet.manifests_path = "#{data['vm']['provision']['puppet']['manifests_path']}"
    puppet.manifest_file  = "#{data['vm']['provision']['puppet']['manifest_file']}"
    puppet.module_path    = "#{data['vm']['provision']['puppet']['module_path']}"

    if !data['vm']['provision']['puppet']['options'].empty?
      puppet.options = data['vm']['provision']['puppet']['options']
    end
  end

  config.vm.provision :shell do |s|
    s.path = 'puphpet/shell/execute-files.sh'
    s.args = ['exec-once', 'exec-always']
  end
  config.vm.provision :shell, run: 'always' do |s|
    s.path = 'puphpet/shell/execute-files.sh'
    s.args = ['startup-once', 'startup-always']
  end
  config.vm.provision :shell, :path => 'puphpet/shell/important-notices.sh'

  if File.file?("#{dir}/puphpet/files/dot/ssh/id_rsa")
    config.ssh.private_key_path = [
      "#{dir}/puphpet/files/dot/ssh/id_rsa",
      "#{dir}/puphpet/files/dot/ssh/insecure_private_key"
    ]
  end

  if !data['ssh']['host'].nil?
    config.ssh.host = "#{data['ssh']['host']}"
  end
  if !data['ssh']['port'].nil?
    config.ssh.port = "#{data['ssh']['port']}"
  end
  if !data['ssh']['username'].nil?
    config.ssh.username = "#{data['ssh']['username']}"
  end
  if !data['ssh']['guest_port'].nil?
    config.ssh.guest_port = data['ssh']['guest_port']
  end
  if !data['ssh']['shell'].nil?
    config.ssh.shell = "#{data['ssh']['shell']}"
  end
  if !data['ssh']['keep_alive'].nil?
    config.ssh.keep_alive = data['ssh']['keep_alive']
  end
  if !data['ssh']['forward_agent'].nil?
    config.ssh.forward_agent = data['ssh']['forward_agent']
  end
  if !data['ssh']['forward_x11'].nil?
    config.ssh.forward_x11 = data['ssh']['forward_x11']
  end
  if !data['vagrant']['host'].nil?
    config.vagrant.host = data['vagrant']['host'].gsub(':', '').intern
  end
end
